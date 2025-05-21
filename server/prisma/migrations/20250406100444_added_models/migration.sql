/*
  Warnings:

  - You are about to drop the column `bookingDate` on the `booking` table. All the data in the column will be lost.
  - Added the required column `coachType` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentPhone` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` DROP COLUMN `bookingDate`,
    ADD COLUMN `bookingStatus` ENUM('PENDING', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `coachType` ENUM('PREMIUM', 'ECONOMY', 'FIRST_CLASS') NOT NULL,
    ADD COLUMN `paymentMethod` VARCHAR(191) NOT NULL DEFAULT 'M-PESA',
    ADD COLUMN `paymentPhone` VARCHAR(191) NOT NULL,
    ADD COLUMN `totalAmount` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Passenger` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `idNo` INTEGER NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `bookingId` VARCHAR(191) NOT NULL,

    INDEX `Passenger_bookingId_idx`(`bookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coachType` ENUM('PREMIUM', 'ECONOMY', 'FIRST_CLASS') NOT NULL,
    `seatNo` VARCHAR(191) NOT NULL,
    `isBooked` BOOLEAN NOT NULL DEFAULT false,
    `tripId` VARCHAR(191) NOT NULL,
    `bookingId` VARCHAR(191) NOT NULL,
    `passengerId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Seat_seatNo_key`(`seatNo`),
    INDEX `Seat_tripId_idx`(`tripId`),
    INDEX `Seat_bookingId_idx`(`bookingId`),
    INDEX `Seat_passengerId_idx`(`passengerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
