import { prisma } from '../lib/prisma'

const [,, id] = process.argv

if (!id) {
  console.error('Usage: npx tsx app/import/cli-delete.ts <RUJ-XXXXXXXXXX>')
  process.exit(1)
}

const project = await prisma.project.findUnique({ where: { name: id } })

if (!project) {
  console.error(`Témoignage introuvable : ${id}`)
  process.exit(1)
}

await prisma.project.delete({ where: { name: id } })
console.log(`Supprimé : ${id}`)
