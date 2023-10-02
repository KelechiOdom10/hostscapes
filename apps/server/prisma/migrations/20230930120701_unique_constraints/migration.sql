/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `Listing` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,listingId]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,listingId]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Listing_userId_title_key` ON `Listing`(`userId`, `title`);

-- CreateIndex
CREATE UNIQUE INDEX `Trip_userId_listingId_key` ON `Trip`(`userId`, `listingId`);

-- CreateIndex
CREATE UNIQUE INDEX `Wishlist_userId_listingId_key` ON `Wishlist`(`userId`, `listingId`);
