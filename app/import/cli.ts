import { importTestimony } from './import'

const [,, projectId, jsonPath, testimonyPath] = process.argv

if (!projectId || !jsonPath || !testimonyPath) {
  console.error('Usage: npx tsx app/import/cli.ts <project-id> <json-file> <testimony-file>')
  process.exit(1)
}

const result = await importTestimony(Number(projectId), jsonPath, testimonyPath)

if (result.success) {
  console.log('Import réussi:', JSON.stringify(result.data, null, 2))
} else {
  console.error('Erreur lors de l\'import:', result.error)
  process.exit(1)
}
