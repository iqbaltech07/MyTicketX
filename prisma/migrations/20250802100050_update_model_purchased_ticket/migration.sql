/*
  Warnings:

  - You are about to drop the column `qrCodeValue` on the `PurchasedTicket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[qrCodeId]` on the table `PurchasedTicket` will be added. If there are existing duplicate values, this will fail.
  - The required column `qrCodeId` was added to the `PurchasedTicket` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "PurchasedTicket_qrCodeValue_key";

-- AlterTable
ALTER TABLE "PurchasedTicket" DROP COLUMN "qrCodeValue",
ADD COLUMN     "qrCodeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PurchasedTicket_qrCodeId_key" ON "PurchasedTicket"("qrCodeId");
