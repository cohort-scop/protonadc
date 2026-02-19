import type { DatePrecision } from '~/data/testimonies';

/**
 * Formate une date selon sa précision
 * - day: "15 septembre 2024"
 * - month: "septembre 2024"
 * - year: "2024"
 */
export function formatEventDate(date: Date, precision: DatePrecision = 'day'): string {
  switch (precision) {
    case 'day':
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    case 'month':
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
      });
    case 'year':
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
      });
    default:
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
  }
}

/**
 * Crée une date à partir de composants (année, mois optionnel, jour optionnel)
 */
export function createEventDate(
  year: number,
  month?: number,
  day?: number
): { date: Date; precision: DatePrecision } {
  if (day && month) {
    return {
      date: new Date(year, month - 1, day),
      precision: 'day',
    };
  }
  if (month) {
    return {
      date: new Date(year, month - 1, 1),
      precision: 'month',
    };
  }
  return {
    date: new Date(year, 0, 1),
    precision: 'year',
  };
}
