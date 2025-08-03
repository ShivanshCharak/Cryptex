/*
  Warnings:

  - You are about to drop the column `userId` on the `Orders` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Orders_userId_filled_idx";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "userId",
ADD COLUMN     "userIds" TEXT[];
