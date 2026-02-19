import { readFile } from 'fs/promises'
import { prisma } from '../lib/prisma'
import { testimonySchema } from './schema'

type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E }

export async function importTestimony(projectId: number, jsonPath: string, testimonyPath: string): Promise<Result<unknown>> {
  const [jsonContent, rawContent] = await Promise.all([
    readFile(jsonPath, 'utf-8'),
    readFile(testimonyPath, 'utf-8'),
  ])

  const parsed = testimonySchema.safeParse(JSON.parse(jsonContent))

  if (!parsed.success) {
    return { success: false, error: parsed.error }
  }

  const data = parsed.data

  try {
    const result = await prisma.$transaction(async (tx) => {

      const person = await tx.person.create({
        data: {
          firstName: data.first_name ?? 'Anonyme',
          lastName: data.last_name ?? '',
          projectId: projectId,
        }
      })

      const testimony = await tx.testimony.create({
        data: {
          ruj: data.id,
          status: data.statut,
          type: data.type,
          content: rawContent,
          facts: data.facts,
          personId: person.id,
          projectId: projectId,
        }
      })

      await tx.factor.createMany({
        data: data.factors.map((f) => ({
          code: f.code,
          verbatim: f.verbatim,
          testimonyId: testimony.id,
          projectId: projectId,
        }))
      })

      await tx.event.createMany({
        data: data.events.map((e) => ({
          content: e.description,
          title: e.title,
          verbatims: e.verbatims,
          linkedTo: e.linked_to,
          beginAt: new Date(e.begin_at),
          endAt: e.end_at ? new Date(e.end_at) : null,
          beginAtRaw: e.begin_at,
          endAtRaw: e.end_at ?? null,
          testimonyId: testimony.id,
          projectId: projectId,
        }))
      })

      return testimony
    })

    return { success: true, data: result }

  } catch (e) {
    return { success: false, error: e as Error }
  }
}
