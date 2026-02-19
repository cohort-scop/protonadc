import { prisma } from '../lib/prisma'

const testimonies = await prisma.testimony.findMany({
  include: { person: true },
})

for (const t of testimonies) {
  console.log(`[${t.id}] ${t.person.firstName} ${t.person.lastName}`)
  console.log(`  facts (${t.facts.length}): ${t.facts.length > 0 ? t.facts[0].slice(0, 80) + '...' : 'aucun'}`)
}

const eventCount = await prisma.event.count()
console.log(`\nTotal events: ${eventCount}`)

await prisma.$disconnect()
