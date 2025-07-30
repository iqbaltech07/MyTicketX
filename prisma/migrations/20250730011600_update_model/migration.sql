/*
  Warnings:

  - You are about to drop the column `onlineUrl` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Event` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "onlineUrl",
DROP COLUMN "type",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "isDraf" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "organizer" TEXT;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "qrCode" TEXT;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
