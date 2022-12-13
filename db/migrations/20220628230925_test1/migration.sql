/*
  Warnings:

  - Added the required column `name` to the `Block` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Block" ADD COLUMN     "name" TEXT NOT NULL;
