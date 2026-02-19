import type { Testimony } from '~/data/testimonies';
import { filterTestimoniesByFactors } from '~/utils/testimony-helpers';
import TestimonyCard from './TestimonyCard';

type TestimonyListProps = {
  testimonies: Testimony[];
  selectedFactors: string[];
  selectedTestimonyId: string | null;
  onTestimonyClick: (id: string) => void;
};

export default function TestimonyList({
  testimonies,
  selectedFactors,
  selectedTestimonyId,
  onTestimonyClick,
}: TestimonyListProps) {
  // Filtrer les témoignages
  const filteredTestimonies = filterTestimoniesByFactors(testimonies, selectedFactors);

  // Trier par date (plus récent en premier)
  const sortedTestimonies = [...filteredTestimonies].sort(
    (a, b) => b.dateAdded.getTime() - a.dateAdded.getTime()
  );

  return (
    <div className="space-y-3 h-full overflow-y-auto pr-2">
      {sortedTestimonies.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Aucun témoignage ne correspond aux filtres sélectionnés
        </div>
      ) : (
        sortedTestimonies.map((testimony) => (
          <TestimonyCard
            key={testimony.id}
            testimony={testimony}
            isSelected={selectedTestimonyId === testimony.id}
            onClick={() => onTestimonyClick(testimony.id)}
          />
        ))
      )}
    </div>
  );
}
