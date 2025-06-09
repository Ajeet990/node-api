/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `InvalidatedToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `InvalidatedToken_token_key` ON `InvalidatedToken`;

-- AlterTable
ALTER TABLE `InvalidatedToken` MODIFY `token` TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `InvalidatedToken_token_key` ON `InvalidatedToken`(`token`(255));
