/*
  Warnings:

  - You are about to drop the column `phone_number` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `energy_level` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `independence_level` on the `pets` table. All the data in the column will be lost.
  - Added the required column `phone` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energy` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `independence` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "phone_number",
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "energy_level",
DROP COLUMN "independence_level",
ADD COLUMN     "energy" TEXT NOT NULL,
ADD COLUMN     "independence" TEXT NOT NULL;
