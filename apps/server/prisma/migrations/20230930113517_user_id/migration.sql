/*
  Warnings:

  - You are about to drop the column `createdById` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Listing` DROP FOREIGN KEY `Listing_createdById_fkey`;

-- AlterTable
ALTER TABLE `Listing` DROP COLUMN `createdById`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
