import { useState } from 'react'
import { useLoaderData } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import { findAllEvents, type TestimonyEvent } from '~/lib/testimony.repository'
import TestimonySidebar from '~/components/TestimonySidebar'
import AppHeader from '~/components/AppHeader'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { requireAuth } from '~/lib/auth.server'
import type { Testimony } from '~/data/testimonies'

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request)
  const events = await findAllEvents()
  return { events }
}

function formatDateShort(raw: string | null): string {
  if (!raw) return '—'
  const d = new Date(raw)
  if (isNaN(d.getTime())) return raw
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatDateLong(raw: string | null): string {
  if (!raw) return 'Date inconnue'
  if (/^\d{4}$/.test(raw)) return raw
  if (/^\d{4}-\d{2}$/.test(raw)) {
    const d = new Date(raw + '-01')
    return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })
  }
  const d = new Date(raw)
  return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
}

function eventToTestimony(event: TestimonyEvent): Testimony {
  const t = event.testimony
  return {
    id: String(t.id),
    ruj: t.ruj ?? undefined,
    firstName: t.person.firstName,
    lastName: t.person.lastName,
    status: t.status as Testimony['status'],
    type: t.type as Testimony['type'],
    content: t.content,
    facts: t.facts,
    factors: t.factors.map(f => f.code),
    dateAdded: t.dateAdded,
    eventDate: event.beginAt ?? t.dateAdded,
    datePrecision: 'day' as const,
  }
}

export default function ChronoMobilePage() {
  const { events } = useLoaderData<typeof loader>()
  const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 md:bg-gradient-to-br md:from-gray-50 md:to-gray-100">

      <AppHeader title="Chronologie" />

      {/* ===== DESKTOP ===== */}
      <div className="hidden md:block">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
            <p className="text-sm text-blue-800">
              <span className="font-bold">{events.length} agissement{events.length > 1 ? 's' : ''}</span> ordonnés chronologiquement du plus ancien au plus récent
            </p>
          </div>
        </div>

        <div className="pb-12">
          <VerticalTimeline lineColor="#3b82f6">
            {events.map(event => (
              <VerticalTimelineElement
                key={event.id}
                date={formatDateLong(event.beginAtRaw)}
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
      </div>

      {/* ===== MOBILE ===== */}
      <div className="md:hidden">
        <div className="px-4 py-2 text-xs text-gray-500">
          {events.length} agissement{events.length > 1 ? 's' : ''} · du plus ancien au plus récent
        </div>

        <div className="px-4 pb-8">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200" />
            <div className="space-y-4">
              {events.map((event, index) => (
                <button
                  key={event.id}
                  onClick={() => setSelectedTestimony(eventToTestimony(event))}
                  className="relative w-full text-left pl-12"
                >
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm z-10">
                    {index + 1}
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 active:scale-[0.98] transition-transform">
                    <p className="text-xs font-semibold text-blue-600 mb-1">
                      {formatDateShort(event.beginAtRaw)}
                    </p>
                    <p className="font-semibold text-gray-900 text-sm mb-1">
                      {event.title ?? event.content.slice(0, 60)}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      {event.testimony.person.firstName} {event.testimony.person.lastName}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                      {event.content}
                    </p>
                    {event.verbatims.length > 0 && (
                      <blockquote className="border-l-2 border-blue-300 pl-2 text-xs italic text-gray-500 line-clamp-1">
                        «&nbsp;{event.verbatims[0]}&nbsp;»
                      </blockquote>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TestimonySidebar testimony={selectedTestimony} onClose={() => setSelectedTestimony(null)} />
    </div>
  )
}
