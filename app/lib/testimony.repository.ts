import { prisma } from './prisma'
import type { Testimony } from '~/data/testimonies'

export type TestimonyEvent = {
  id: number
  title: string | null
  content: string
  beginAt: Date | null
  endAt: Date | null
  beginAtRaw: string | null
  endAtRaw: string | null
  verbatims: string[]
  linkedTo: string | null
  testimony: {
    id: number
    ruj: string | null
    status: string
    type: string
    content: string
    facts: string[]
    dateAdded: Date
    person: { firstName: string; lastName: string }
    factors: { code: string }[]
  }
}

export async function findProjectName(): Promise<string | null> {
  const project = await prisma.project.findFirst()
  return project?.name ?? null
}

export async function findAllEvents(): Promise<TestimonyEvent[]> {
  return prisma.event.findMany({
    include: {
      testimony: {
        include: {
          person: true,
          factors: { select: { code: true } },
        },
      },
    },
    orderBy: { beginAt: 'asc' },
  })
}

export async function findAllTestimonies(): Promise<Testimony[]> {
  const rows = await prisma.testimony.findMany({
    include: {
      person: true,
      factors: true,
      events: true,
    },
    orderBy: { dateAdded: 'desc' },
  })

  return rows.map((row) => ({
    id: String(row.id),
    ruj: row.ruj ?? undefined,
    firstName: row.person.firstName,
    lastName: row.person.lastName,
    status: row.status as Testimony['status'],
    type: row.type as Testimony['type'],
    content: row.content,
    facts: row.facts,
    factors: row.factors.map((f) => f.code),
    dateAdded: row.dateAdded,
    eventDate: row.events[0]?.beginAt ?? row.dateAdded,
    datePrecision: 'day' as const,
  }))
}
