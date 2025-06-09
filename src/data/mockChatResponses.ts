import type { Message } from '../types/chat';

// Mots-clés pour déclencher différents types de réponses
export const TRIGGER_KEYWORDS = {
  CODE: ['code', 'python', 'analyse', 'script'],
  MATH: ['formule', 'calcul', 'ratio', 'equation'],
  CHART: ['graphique', 'evolution', 'tendance', 'statistiques'],
  TABLE: ['tableau', 'données', 'comparaison'],
} as const;

// Réponses pour le code Python
export const CODE_RESPONSES = [
  `Voici un exemple d'analyse avec Python:
\`\`\`python
import pandas as pd
import numpy as np

# Charger les données financières
data = pd.DataFrame({
    'date': pd.date_range('2024-01-01', periods=6, freq='M'),
    'revenue': np.random.randint(1000000, 2000000, 6),
    'charges': np.random.randint(800000, 1500000, 6)
})

# Calculer la marge
data['marge'] = data['revenue'] - data['charges']
data['marge_ratio'] = (data['marge'] / data['revenue'] * 100).round(2)

# Afficher les statistiques
print(data.describe())

# Calculer les tendances
print("\\nTendance du chiffre d'affaires:")
print(f"Croissance: {((data['revenue'].iloc[-1] / data['revenue'].iloc[0] - 1) * 100).round(2)}%")
\`\`\``,

  `Voici un script pour analyser les ratios financiers:
\`\`\`python
def calculer_ratios(actif_circulant, passif_circulant, dette_totale, capitaux_propres):
    # Ratio de liquidité
    ratio_liquidite = actif_circulant / passif_circulant
    
    # Ratio d'endettement
    ratio_endettement = dette_totale / capitaux_propres
    
    return {
        'liquidite': ratio_liquidite,
        'endettement': ratio_endettement
    }

# Exemple d'utilisation
ratios = calculer_ratios(
    actif_circulant=1500000,
    passif_circulant=900000,
    dette_totale=2500000,
    capitaux_propres=5000000
)

print("Ratios financiers:")
print(f"Liquidité: {ratios['liquidite']:.2f}")
print(f"Endettement: {ratios['endettement']:.2f}")
\`\`\``
];

// Réponses avec formules mathématiques
export const MATH_RESPONSES = [
  `Voici les formules des principaux ratios financiers:

1. Ratio de rentabilité des capitaux propres (ROE):
$ROE = \\frac{Résultat\\ Net}{Capitaux\\ Propres} \\times 100$

2. Ratio de solvabilité:
$Solvabilité = \\frac{Capitaux\\ Propres}{Total\\ Passif} \\times 100$

3. Ratio de liquidité générale:
$Liquidité = \\frac{Actif\\ Circulant}{Passif\\ Circulant}$`,

  `Calcul de la Valeur Actuelle Nette (VAN):
$VAN = -I_0 + \\sum_{t=1}^{n} \\frac{CF_t}{(1+r)^t}$

Où:
- $I_0$ = Investissement initial
- $CF_t$ = Flux de trésorerie à la période t
- $r$ = Taux d'actualisation
- $n$ = Nombre de périodes`
];

// Réponses avec graphiques
export const CHART_RESPONSES = [
  `Voici l'évolution du chiffre d'affaires sur les 6 derniers mois:
\`\`\`chart
{
  "type": "bar",
  "x": ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
  "y": [1200000, 1500000, 1800000, 1600000, 2000000, 2300000],
  "name": "CA mensuel"
}
\`\`\``,

  `Répartition des charges par catégorie:
\`\`\`chart
{
  "type": "pie",
  "labels": ["Personnel", "Achats", "Services", "Amortissements", "Autres"],
  "values": [450000, 320000, 180000, 150000, 100000],
  "name": "Répartition des charges"
}
\`\`\``
];

// Fonction pour détecter les mots-clés dans un message
export function detectKeywords(message: string): string[] {
  const keywords: string[] = [];
  const messageLower = message.toLowerCase();

  Object.entries(TRIGGER_KEYWORDS).forEach(([type, triggers]) => {
    if (triggers.some(trigger => messageLower.includes(trigger))) {
      keywords.push(type);
    }
  });

  return keywords;
}

// Fonction pour générer une réponse basée sur les mots-clés
export function generateResponse(keywords: string[]): string {
  if (keywords.includes('CODE')) {
    return CODE_RESPONSES[Math.floor(Math.random() * CODE_RESPONSES.length)];
  }
  if (keywords.includes('MATH')) {
    return MATH_RESPONSES[Math.floor(Math.random() * MATH_RESPONSES.length)];
  }
  if (keywords.includes('CHART')) {
    return CHART_RESPONSES[Math.floor(Math.random() * CHART_RESPONSES.length)];
  }

  // Réponse par défaut
  return "Je peux vous aider à analyser vos données financières. Essayez de me demander:\n- Une analyse de code\n- Des formules de calcul\n- Des graphiques d'évolution";
}