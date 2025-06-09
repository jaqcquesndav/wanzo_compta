// Fonction utilitaire pour combiner les classes CSS conditionnellement
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
