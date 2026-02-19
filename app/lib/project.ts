import { prisma } from '../lib/prisma'

export async function createProject(projectName: string) {
  return prisma.project.create({
    data: { name: projectName }
  })
}
