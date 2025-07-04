/*
  Warnings:

  - You are about to drop the column `userIds` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "userIds",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Orders_userId_filled_idx" ON "Orders"("userId", "filled");
