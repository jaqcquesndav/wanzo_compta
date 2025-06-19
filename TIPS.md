# Astuces pour l'authentification Auth0 dans Wanzo Admin

Ce document présente les principaux aspects de l'implémentation de l'authentification Auth0 dans l'application Wanzo Admin, avec des explications détaillées sur le flux d'authentification.

## Flux d'authentification complet

L'application implémente un flux d'authentification OAuth 2.0 avec code d'autorisation, intégré avec Auth0 et le backend Wanzo.

### 1. Configuration initiale

Le processus commence avec la configuration d'Auth0 via le composant `AuthProvider` :

```tsx
// src/auth/AuthProvider.tsx
<Auth0Provider
  domain={import.meta.env.VITE_AUTH0_DOMAIN}
  clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
  authorizationParams={{
    redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    scope: import.meta.env.VITE_AUTH0_SCOPE
  }}
  onRedirectCallback={onRedirectCallback}
  useRefreshTokens={true}
  cacheLocation="localstorage"
>
  {children}
</Auth0Provider>
```

### 2. Déclenchement de l'authentification

Quand l'utilisateur clique sur le bouton de connexion, nous utilisons `loginWithRedirect` :

```tsx
// src/components/auth/LoginButton.tsx
const { loginWithRedirect } = useAuth0();

return (
  <button onClick={() => loginWithRedirect()}>
    Connexion
  </button>
);
```

### 3. Traitement du retour d'Auth0 (Callback)

Après authentification réussie, l'utilisateur est redirigé vers notre URL de callback avec un code d'autorisation :

```tsx
// src/pages/auth/AuthCallbackPage.tsx
const processAuthentication = async () => {
  // Vérifier le code dans l'URL
  const params = new URLSearchParams(location.search);
  const hasAuthCode = params.has('code');
  
  if (isAuth0Authenticated && user) {
    try {
      // 1. Récupérer le token d'accès
      const accessTokenResponse = await getAccessTokenSilently({
        detailedResponse: true,
      });
      
      // 2. Récupérer les claims du token d'ID
      const idTokenClaims = await getIdTokenClaims();
      
      // 3. Stocker et valider le token avec le backend
      await authService.refreshTokenFromAuth0(
        user, 
        accessTokenResponse.access_token,
        accessTokenResponse.id_token,
        undefined, // refresh_token géré par le SDK
        accessTokenResponse.expires_in
      );
      
      // 4. Rediriger vers le dashboard
      navigate('/dashboard', { replace: true });
    } catch (tokenError) {
      // Gestion des erreurs
    }
  }
};
```

### 4. Validation avec le backend

Après avoir obtenu le token, nous le validons avec notre backend :

```typescript
// src/services/auth/authService.ts
async validateTokenWithBackend(token) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_GATEWAY_URL}/admin/auth/validate-token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) return { isValid: false };
    
    const data = await response.json();
    return data;
  } catch (error) {
    return { isValid: false };
  }
}
```

### 5. Utilisation des tokens pour les API

Une fois validés, les tokens sont utilisés pour authentifier les requêtes API :

```typescript
// src/services/api/apiService.ts
apiClient.interceptors.request.use(
  async (config) => {
    if (isAuthenticated) {
      try {
        const token = await getAccessTokenSilently();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Erreur lors de l\'obtention du token:', error);
      }
    }
    return config;
  }
);
```

### 6. Gestion des tokens expirés

Un intercepteur de réponse gère le cas des tokens expirés :

```typescript
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        // Tenter de rafraîchir le token
        const newToken = await getAccessTokenSilently({ cacheMode: 'off' });
        const validationResult = await authService.validateTokenWithBackend(newToken);
        
        if (validationResult.isValid) {
          // Réessayer la requête originale
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        } else {
          // Rediriger vers login si le token est invalide
          window.location.href = '/login';
        }
      } catch (refreshError) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
```

### 7. Déconnexion et invalidation de session

Lors de la déconnexion, nous invalidons d'abord la session backend :

```tsx
// src/components/auth/LogoutButton.tsx
const handleLogout = async () => {
  // 1. Invalider la session côté backend
  try {
    await authService.logout();
  } catch (error) {
    console.error('Erreur lors de l\'invalidation de la session backend:', error);
  }

  // 2. Déconnexion d'Auth0
  logout({ 
    logoutParams: { 
      returnTo: import.meta.env.VITE_AUTH0_LOGOUT_URI 
    } 
  });
};
```

## Points importants à retenir

1. **Configuration des URLs** : Toutes les requêtes au backend doivent suivre le format `/admin/[ENDPOINT]`

2. **Gestion du token** : Le SDK Auth0 gère automatiquement le stockage et le rafraîchissement des tokens, mais nous avons ajouté une couche de validation avec le backend

3. **Stockage des tokens** : Les tokens sont stockés dans le localStorage avec des clés préfixées par `wanzo_`

4. **Validation backend** : Le token doit être validé par le backend via `/admin/auth/validate-token` pour confirmer qu'il est valide et récupérer des informations utilisateur enrichies

5. **Invalidation de session** : Lors de la déconnexion, la session doit être invalidée côté backend via `/admin/auth/invalidate-session` avant de déconnecter l'utilisateur d'Auth0

## Variables d'environnement requises

```
# Configuration Auth0
VITE_AUTH0_DOMAIN=dev-tezmln0tk0g1gouf.eu.auth0.com
VITE_AUTH0_CLIENT_ID=43d64kgsVYyCZHEFsax7zlRBVUiraCKL
VITE_AUTH0_AUDIENCE=https://api.wanzo.com
VITE_AUTH0_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_AUTH0_LOGOUT_URI=http://localhost:5173/login
VITE_AUTH0_SCOPE=openid profile email

# Configuration API Gateway
VITE_API_GATEWAY_URL=https://api.wanzo.com
```
