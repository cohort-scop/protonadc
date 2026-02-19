import type { Testimony } from '~/data/testimonies';
import { getFactorColor } from '~/utils/testimony-helpers';

const TYPE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  'AGISSEMENT DIRECT':   { bg: 'bg-red-50',    border: 'border-red-400',    text: 'text-red-800' },
  'TÉMOIN INDIRECT':     { bg: 'bg-gray-100',  border: 'border-gray-400',   text: 'text-gray-800' },
  'CONTEXTE STRUCTUREL': { bg: 'bg-indigo-50', border: 'border-indigo-400', text: 'text-indigo-800' },
  'DÉCHARGE':            { bg: 'bg-green-50',  border: 'border-green-400',  text: 'text-green-800' },
  'DIRECT ET STRUCTUREL': { bg: 'bg-purple-50', border: 'border-purple-400', text: 'text-purple-800' },
};

type TestimonyCardProps = {
  testimony: Testimony;
  isSelected: boolean;
  onClick: () => void;
};

export default function TestimonyCard({ testimony, isSelected, onClick }: TestimonyCardProps) {
  return (
    <article
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Témoignage de ${testimony.firstName} ${testimony.lastName}`}
      className={`
        group relative bg-white rounded-xl p-5 cursor-pointer
        transition-all duration-200 border-2
        ${
          isSelected
            ? 'border-blue-500 shadow-xl ring-4 ring-blue-100 scale-[1.02]'
            : 'border-gray-100 shadow-md hover:shadow-xl hover:border-gray-200'
        }
      `}
    >
      {/* Indicateur visuel de sélection */}
      {isSelected && (
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-12 bg-blue-500 rounded-r" />
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {testimony.firstName} {testimony.lastName}
            {testimony.ruj && (
              <span className="ml-2 text-sm font-normal text-gray-400">{testimony.ruj}</span>
            )}
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {testimony.status}
            </span>
            {(() => {
              const c = TYPE_COLORS[testimony.type] ?? { bg: 'bg-gray-100', border: 'border-gray-400', text: 'text-gray-800' };
              return (
                <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${c.bg} ${c.border} ${c.text}`}>
                  {testimony.type}
                </span>
              );
            })()}
          </div>
        </div>

        {/* Icône d'ouverture */}
        <div
          className={`
            ml-3 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
            transition-all
            ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}
          `}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {testimony.factors.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
          {testimony.factors.map((factorCode) => {
            const colors = getFactorColor(factorCode);
            return (
              <span
                key={factorCode}
                className={`
                  inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border
                  ${colors.bg} ${colors.text} ${colors.border}
                  transition-transform hover:scale-105
                `}
              >
                {factorCode}
              </span>
            );
          })}
        </div>
      )}
    </article>
  );
}
