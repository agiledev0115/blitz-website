/*
  Warnings:

  - The values [TEST] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
ALTER TABLE "Section" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Space" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Space" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "Section" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Section" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
ALTER TABLE "Space" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;
