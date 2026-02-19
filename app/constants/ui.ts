/**
 * Constantes UI pour l'application
 */

// Nombre de facteurs affichés par défaut dans la vue d'ensemble
export const DEFAULT_VISIBLE_FACTORS = 4;

// Durée de l'animation de la sidebar (en ms)
export const SIDEBAR_ANIMATION_DURATION = 300;

// Classes CSS réutilisables
export const UI_CLASSES = {
  card: {
    base: 'bg-white rounded-xl shadow-md transition-all duration-200',
    hover: 'hover:shadow-xl',
    selected: 'ring-4 ring-blue-100 border-blue-500',
  },
  badge: {
    base: 'inline-flex items-center px-3 py-1 text-xs font-medium rounded-full',
    status: 'bg-blue-50 text-blue-700 border border-blue-200',
    type: 'bg-gray-800 text-white',
  },
  button: {
    primary: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors',
    secondary: 'px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors',
  },
} as const;

// Messages d'accessibilité
export const ARIA_LABELS = {
  closeSidebar: 'Fermer le panneau de détail',
  closeOverlay: 'Fermer le panneau',
  expandFactors: 'Voir tous les facteurs',
  collapseFactors: 'Voir moins de facteurs',
  testimony: (firstName: string, lastName: string) => `Témoignage de ${firstName} ${lastName}`,
} as const;
