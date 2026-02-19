import { useState } from 'react';
import { useLoaderData } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { findAllEvents, type TestimonyEvent } from '~/lib/testimony.repository';
import AppNav from '~/components/AppNav';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import TestimonySidebar from '~/components/TestimonySidebar';
import type { Testimony } from '~/data/testimonies';
import { requireAuth } from '~/lib/auth.server';

function eventToTestimony(event: TestimonyEvent): Testimony {
  const t = event.testimony;
  return {
    id: String(t.id),
    ruj: t.ruj ?? undefined,
    firstName: t.person.firstName,
    lastName: t.person.lastName,
    status: t.status as Testimony['status'],
    type: t.type as Testimony['type'],
    content: t.content,
    facts: t.facts,
    factors: t.factors.map((f) => f.code),
    dateAdded: t.dateAdded,
    eventDate: event.beginAt ?? t.dateAdded,
    datePrecision: 'day' as const,
  };
}

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  const events = await findAllEvents();
  return { events };
}

export function meta() {
  return [
    { title: 'Chronologie (DB) - Témoignages' },
    { name: 'description', content: 'Vue chronologique des événements depuis la base de données' },
  ];
}

function formatDate(raw: string | null): string {
  if (!raw) return 'Date inconnue';
  // Précision année : "YYYY"
  if (/^\d{4}$/.test(raw)) return raw;
  // Précision mois : "YYYY-MM"
  if (/^\d{4}-\d{2}$/.test(raw)) {
    const d = new Date(raw + '-01');
    return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
  }
  // Précision jour : "YYYY-MM-DD"
  const d = new Date(raw);
  return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Chronologie2Page() {
  const { events } = useLoaderData<typeof loader>();
  const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Chronologie</h1>
              <p className="text-gray-600 mt-2 text-lg">Données depuis la base PostgreSQL</p>
            </div>
            <AppNav />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
          <p className="text-sm text-blue-800">
            <span className="font-bold">{events.length} agissement{events.length > 1 ? 's' : ''}</span> ordonnés chronologiquement du plus ancien au plus récent
          </p>
        </div>
      </div>

      <div className="pb-12">
        <VerticalTimeline lineColor="#3b82f6">
          {events.map((event) => (
            <VerticalTimelineElement
              key={event.id}
              date={formatDate(event.beginAtRaw)}
              iconStyle={{ background: '#3b82f6', color: '#fff', boxShadow: '0 0 0 4px #dbeafe' }}
              icon={
                <div className="flex items-center justify-center h-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              }
              contentStyle={{ background: '#fff', borderTop: '3px solid #e5e7eb', boxShadow: '0 3px 10px rgba(0,0,0,0.1)', cursor: 'pointer' }}
              contentArrowStyle={{ borderRight: '7px solid #e5e7eb' }}
              onTimelineElementClick={() => setSelectedTestimony(eventToTestimony(event))}
            >
              <h3 className="text-base font-bold text-gray-900 mb-1">{event.title ?? event.content.slice(0, 60)}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {event.testimony.person.firstName} {event.testimony.person.lastName}
              </p>
              <p className="text-sm text-gray-700 mb-3">{event.content}</p>

              {event.verbatims.length > 0 && (
                <div className="mb-3 space-y-1">
                  {event.verbatims.map((v, i) => (
                    <blockquote key={i} className="border-l-2 border-blue-300 pl-3 text-sm italic text-gray-600">
                      «&nbsp;{v}&nbsp;»
                    </blockquote>
                  ))}
                </div>
              )}

            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>

        {events.length === 0 && (
          <p className="text-center text-gray-500 py-20">Aucun événement en base.</p>
        )}
      </div>

      <TestimonySidebar testimony={selectedTestimony} onClose={() => setSelectedTestimony(null)} />
    </div>
  );
}
