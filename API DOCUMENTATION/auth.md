# Auth API Documentation

This document describes the Authentication API endpoints for the Wanzo Compta application.

## Base URL

```
http://localhost:3000/api/v1
```

## Authentication

Most endpoints require authentication with a Bearer token.

**Headers:**
```
Authorization: Bearer <token>
```

## Endpoints

### Verify Token

Verifies if the current authentication token is valid.

**URL:** `/auth/verify`

**Method:** `GET`

**Authentication Required:** Yes

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "comptable",
      "registrationNumber": "12345" // Only for auditors
    }
  }
}
```

### Login with SSO

Authenticates a user using Single Sign-On (KS Auth).

**URL:** `/auth/sso`

**Method:** `POST`

**Authentication Required:** No

**Request Body:**
```json
{}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "comptable",
      "registrationNumber": "12345" // Only for auditors
    },
    "token": "jwt-token-here"
  }
}
```

### Logout

Logs out the currently authenticated user.

**URL:** `/auth/logout`

**Method:** `POST`

**Authentication Required:** Yes

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{}
```

**Response:**

```json
{
  "success": true
}
```

## Error Responses

**Unauthorized (401):**
```json
{
  "success": false,
  "error": "Session expirée"
}
```

**Other Errors:**
```json
{
  "success": false,
  "error": "Error message description"
}
```

## User Management

### Get All Users

Retrieves a list of all users for the organization.

**URL:** `/users`

**Method:** `GET`

**Authentication Required:** Yes (Admin role required)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "user-123",
      "email": "admin@kiota.com",
      "name": "Super Administrateur",
      "role": "superadmin",
      "department": "Direction",
      "lastLogin": "2024-03-01T15:30:00Z",
      "status": "active",
      "avatar": "https://..."
    },
    {
      "id": "user-124",
      "email": "comptable@kiota.com",
      "name": "Jean Dupont",
      "role": "user",
      "department": "Comptabilité",
      "lastLogin": "2024-03-01T14:45:00Z",
      "status": "active",
      "avatar": "https://..."
    }
  ]
}
```

### Create User

Creates a new user in the organization.

**URL:** `/users`

**Method:** `POST`

**Authentication Required:** Yes (Admin role required)

**Request Body**:
```json
{
  "email": "new.user@example.com",
  "name": "Jane Doe",
  "role": "user",
  "department": "Ventes"
}
```

**Response:** `201 Created`


### Update User

Updates an existing user's information.

**URL:** `/users/{id}`

**Method:** `PUT`

**Authentication Required:** Yes (Admin role required)

**Request Body**:
```json
{
  "name": "Jane Smith",
  "role": "admin",
  "department": "Marketing"
}
```

**Response:** `200 OK`

### Delete User

Deletes a user account.

**URL:** `/users/{id}`

**Method:** `DELETE`

**Authentication Required:** Yes (Admin role required)

**Response:** `204 No Content`

### Toggle User Status

Activates or deactivates a user account.

**URL:** `/users/{id}/status`

**Method:** `PATCH`

**Authentication Required:** Yes (Admin role required)

**Request Body**:
```json
{
  "active": false
}
```

**Response:** `200 OK`

## Data Structures

### User

```typescript
interface User {
  id: string;
  email: string;
  name?: string;
  role: 'superadmin' | 'admin' | 'user' | 'auditor' | 'comptable' | 'gérant' | 'portfoliomanager';
  registrationNumber?: string; // For auditors
  department?: string;
  lastLogin?: string;
  status?: 'active' | 'inactive';
  avatar?: string;
}
```
