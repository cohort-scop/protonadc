import type { Testimony } from '~/data/testimonies';
import { getCategoryColor, getFactorCodesByCategory } from '~/utils/testimony-helpers';

const CATEGORIES = ['Thématiques', 'Organisationnels', 'Relationnels', 'Individuels', 'Conséquences'];

type FilterCategoriesProps = {
  testimonies: Testimony[];
  selectedFactors: string[];
  onCategoryToggle: (codes: string[], allSelected: boolean) => void;
  onClearFilters: () => void;
};

export default function FilterCategories({
  selectedFactors,
  onCategoryToggle,
  onClearFilters,
}: FilterCategoriesProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {CATEGORIES.map((category) => {
        const codes = getFactorCodesByCategory(category);
        const activeCount = codes.filter((c) => selectedFactors.includes(c)).length;
        const allSelected = activeCount === codes.length;
        const someSelected = activeCount > 0 && !allSelected;
        const colors = getCategoryColor(category);

        return (
          <button
            key={category}
            onClick={() => onCategoryToggle(codes, allSelected)}
            className={`
              px-4 py-2 rounded-lg border-2 font-semibold text-sm transition-all
              flex items-center gap-2
              ${allSelected
                ? `${colors.bg} ${colors.border} ${colors.text}`
                : someSelected
                  ? `bg-white ${colors.border} ${colors.text}`
                  : `bg-white border-gray-200 text-gray-600 hover:border-gray-300`
              }
            `}
          >
            {category}
            {activeCount > 0 && (
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                {activeCount}
              </span>
            )}
          </button>
        );
      })}

      {selectedFactors.length > 0 && (
        <button
          onClick={onClearFilters}
          className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Effacer ({selectedFactors.length})
        </button>
      )}
    </div>
  );
}
