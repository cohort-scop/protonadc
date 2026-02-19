-- AlterTable
ALTER TABLE "testimonies" ADD COLUMN     "facts" TEXT[] DEFAULT ARRAY[]::TEXT[];
