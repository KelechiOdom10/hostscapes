/*
  Warnings:

  - You are about to drop the column `numberOfBeds` on the `listings` table. All the data in the column will be lost.
  - Added the required column `numBeds` to the `listings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `listings` DROP COLUMN `numberOfBeds`,
    ADD COLUMN `numBeds` VARCHAR(191) NOT NULL;
