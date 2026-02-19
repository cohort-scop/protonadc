import type { Testimony } from '~/data/testimonies';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { getFactorColor } from '~/utils/testimony-helpers';
import { formatEventDate } from '~/utils/date-helpers';

type TimelineProps = {
  testimonies: Testimony[];
  selectedTestimonyId: string | null;
  onTestimonyClick: (id: string) => void;
};

export default function Timeline({
  testimonies,
  selectedTestimonyId,
  onTestimonyClick,
}: TimelineProps) {
  // Trier par date d'événement (plus ancien au plus récent)
  const sortedTestimonies = [...testimonies].sort(
    (a, b) => a.eventDate.getTime() - b.eventDate.getTime()
  );

  return (
    <VerticalTimeline lineColor="#3b82f6">
      {sortedTestimonies.map((testimony) => {
        const isSelected = selectedTestimonyId === testimony.id;

        return (
          <VerticalTimelineElement
            key={testimony.id}
            date={formatEventDate(testimony.eventDate, testimony.datePrecision)}
            iconStyle={{
              background: isSelected ? '#2563eb' : '#3b82f6',
              color: '#fff',
              boxShadow: isSelected ? '0 0 0 4px #93c5fd' : '0 0 0 4px #dbeafe',
            }}
            icon={
              <div className="flex items-center justify-center h-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            }
            contentStyle={{
              background: isSelected ? '#eff6ff' : '#fff',
              borderTop: isSelected ? '3px solid #2563eb' : '3px solid #e5e7eb',
              boxShadow: isSelected
                ? '0 10px 25px rgba(37, 99, 235, 0.2)'
                : '0 3px 10px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            contentArrowStyle={{
              borderRight: isSelected ? '7px solid #2563eb' : '7px solid #e5e7eb',
            }}
            onTimelineElementClick={() => onTestimonyClick(testimony.id)}
          >
            <div className="hover:scale-[1.02] transition-transform">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {testimony.firstName} {testimony.lastName}
              </h3>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {testimony.status}
                </span>
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gray-800 text-white">
                  {testimony.type}
                </span>
              </div>

              {testimony.factors.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-200">
                  {testimony.factors.slice(0, 5).map((factorCode) => {
                    const colors = getFactorColor(factorCode);
                    return (
                      <span
                        key={factorCode}
                        className={`
                          inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border
                          ${colors.bg} ${colors.text} ${colors.border}
                        `}
                      >
                        {factorCode}
                      </span>
                    );
                  })}
                  {testimony.factors.length > 5 && (
                    <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md bg-gray-100 text-gray-600">
                      +{testimony.factors.length - 5}
                    </span>
                  )}
                </div>
              )}
            </div>
          </VerticalTimelineElement>
        );
      })}
    </VerticalTimeline>
  );
}
