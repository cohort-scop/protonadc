/*
  Warnings:

  - You are about to drop the column `content` on the `factors` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `factors` table. All the data in the column will be lost.
  - Added the required column `code` to the `factors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verbatim` to the `factors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "factors" DROP COLUMN "content",
DROP COLUMN "name",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "verbatim" TEXT NOT NULL;
