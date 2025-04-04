/*
  Warnings:

  - You are about to drop the column `arrivalTime` on the `scheduletemplate` table. All the data in the column will be lost.
  - You are about to alter the column `departureTime` on the `scheduletemplate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `scheduletemplate` DROP COLUMN `arrivalTime`,
    MODIFY `departureTime` ENUM('MORNING', 'AFTERNOON', 'EVENING') NOT NULL;

-- AlterTable
ALTER TABLE `trip` MODIFY `departureDate` DATE NOT NULL;
