import { createProject } from '../lib/project'

const [,, projectName] = process.argv

if (!projectName) {
  console.error('Usage: npx tsx app/import/cli-create-project.ts <project-name>')
  process.exit(1)
}

const project = await createProject(projectName)
console.log(project.id)
