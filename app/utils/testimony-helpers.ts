import type { Testimony } from '~/data/testimonies';
import { FACTORS } from '~/constants/factors';

export function calculateFactorCounts(testimonies: Testimony[]): Record<string, number> {
  const counts: Record<string, number> = {};

  Object.keys(FACTORS).forEach((code) => {
    counts[code] = 0;
  });

  testimonies.forEach((testimony) => {
    testimony.factors.forEach((factorCode) => {
      if (counts[factorCode] !== undefined) {
        counts[factorCode]++;
      }
    });
  });

  return counts;
}

export function filterTestimoniesByFactors(
  testimonies: Testimony[],
  selectedFactors: string[]
): Testimony[] {
  if (selectedFactors.length === 0) {
    return testimonies;
  }

  return testimonies.filter((testimony) =>
    testimony.factors.some((factor) => selectedFactors.includes(factor))
  );
}

export function getFactorLabel(code: string): string {
  return FACTORS[code]?.name ?? code;
}

export function getFactorCategory(code: string): string {
  return FACTORS[code]?.category ?? 'Unknown';
}

export function groupFactorsByCategory(): Record<string, { code: string; name: string }[]> {
  const grouped: Record<string, { code: string; name: string }[]> = {
    Thématiques: [],
    Organisationnels: [],
    Relationnels: [],
    Individuels: [],
    Conséquences: [],
  };

  Object.entries(FACTORS).forEach(([code, entry]) => {
    grouped[entry.category]?.push({ code, name: entry.name });
  });

  return grouped;
}

export function getCategoryColor(category: string): { bg: string; text: string; border: string } {
  switch (category) {
    case 'Thématiques':
      return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' };
    case 'Organisationnels':
      return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' };
    case 'Relationnels':
      return { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' };
    case 'Individuels':
      return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' };
    case 'Conséquences':
      return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-300' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' };
  }
}

export function getFactorColor(code: string): { bg: string; text: string; border: string } {
  return getCategoryColor(getFactorCategory(code));
}

export function getFactorCodesByCategory(category: string): string[] {
  return Object.entries(FACTORS)
    .filter(([, entry]) => entry.category === category)
    .map(([code]) => code);
}
