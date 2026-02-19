import { prisma } from '../lib/prisma'

const [,, ruj] = process.argv

if (!ruj) {
  console.error('Usage: npx tsx app/import/cli-delete-testimony.ts <RUJ-XXXXXXXXXX>')
  process.exit(1)
}

const testimony = await prisma.testimony.findFirst({ where: { ruj } })

if (!testimony) {
  console.error(`Témoignage introuvable : ${ruj}`)
  process.exit(1)
}

await prisma.testimony.delete({ where: { id: testimony.id } })
await prisma.person.delete({ where: { id: testimony.personId } })
console.log(`Supprimé : ${ruj}`)
