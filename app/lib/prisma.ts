import { PrismaClient } from '@prisma/client'

// Singleton - une seule instance de PrismaClient
// Équivalent du pool de connexions Ecto
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
