/*
  Warnings:

  - You are about to drop the column `locationData` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `locationType` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `mapData` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `placeAmeneites` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `placeSpace` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `placetype` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `tripData` on the `trips` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `listings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amenities` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxGuests` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numBaths` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numBedrooms` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfBeds` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `listings` DROP COLUMN `locationData`,
    DROP COLUMN `locationType`,
    DROP COLUMN `mapData`,
    DROP COLUMN `placeAmeneites`,
    DROP COLUMN `placeSpace`,
    DROP COLUMN `placetype`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `amenities` JSON NOT NULL,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `latitude` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `listingType` ENUM('Apartment', 'House') NULL DEFAULT 'Apartment',
    ADD COLUMN `longitude` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `maxGuests` INTEGER NOT NULL,
    ADD COLUMN `numBaths` INTEGER NOT NULL,
    ADD COLUMN `numBedrooms` INTEGER NOT NULL,
    ADD COLUMN `numberOfBeds` VARCHAR(191) NOT NULL,
    ADD COLUMN `shortDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `trips` DROP COLUMN `tripData`,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `listings_slug_key` ON `listings`(`slug`);
