/*
  Warnings:

  - You are about to drop the column `status` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Orders` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Orders_userId_status_idx";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "status",
DROP COLUMN "type",
ADD COLUMN     "filled" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "side" TEXT NOT NULL DEFAULT 'buy';

-- CreateIndex
CREATE INDEX "Orders_userId_filled_idx" ON "Orders"("userId", "filled");
