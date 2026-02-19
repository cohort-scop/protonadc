import { readdir, readFile } from 'fs/promises'
import { prisma } from '../lib/prisma'

const files = await readdir('temoignages')
const jsonFiles = files.filter(f => f.startsWith('json_') && f.endsWith('.json'))

for (const file of jsonFiles) {
  const content = await readFile(`temoignages/${file}`, 'utf-8')
  const data = JSON.parse(content)

  for (const event of data.events ?? []) {
    const dbEvent = await prisma.event.findFirst({
      where: { linkedTo: event.linked_to, testimony: { ruj: data.id } },
    })
    // Trouver par title + testimony ruj
    const dbEventByTitle = await prisma.event.findFirst({
      where: { title: event.title, testimony: { ruj: data.id } },
    })
    if (dbEventByTitle && dbEventByTitle.beginAtRaw === null) {
      await prisma.event.update({
        where: { id: dbEventByTitle.id },
        data: { beginAtRaw: event.begin_at, endAtRaw: event.end_at ?? null },
      })
      console.log(`Patché: ${data.id} / ${event.title} → ${event.begin_at}`)
    }
  }
}

console.log('Patch terminé')
