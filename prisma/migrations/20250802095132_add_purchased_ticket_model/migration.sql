-- CreateTable
CREATE TABLE "PurchasedTicket" (
    "id" TEXT NOT NULL,
    "orderItemId" TEXT NOT NULL,
    "qrCodeValue" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'VALID',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchasedTicket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PurchasedTicket_qrCodeValue_key" ON "PurchasedTicket"("qrCodeValue");

-- AddForeignKey
ALTER TABLE "PurchasedTicket" ADD CONSTRAINT "PurchasedTicket_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
