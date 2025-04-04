-- CreateTable
CREATE TABLE `Booking` (
    `id` VARCHAR(191) NOT NULL,
    `bookingDate` DATETIME(3) NOT NULL,
    `tripId` VARCHAR(191) NOT NULL,

    INDEX `Booking_tripId_idx`(`tripId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScheduleTemplate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `departureTime` VARCHAR(191) NOT NULL,
    `arrivalTime` VARCHAR(191) NOT NULL,
    `departureStationId` INTEGER NOT NULL,
    `arrivalStationId` INTEGER NOT NULL,
    `trainId` INTEGER NOT NULL,

    INDEX `ScheduleTemplate_departureStationId_idx`(`departureStationId`),
    INDEX `ScheduleTemplate_arrivalStationId_idx`(`arrivalStationId`),
    INDEX `ScheduleTemplate_trainId_idx`(`trainId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Station` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Station_name_key`(`name`),
    UNIQUE INDEX `Station_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Train` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trainType` ENUM('EXPRESS', 'INTER_COUNTY') NOT NULL,
    `capacity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trip` (
    `id` VARCHAR(191) NOT NULL,
    `departureDate` DATETIME(3) NOT NULL,
    `tripType` ENUM('ONE_WAY', 'RETURN') NOT NULL DEFAULT 'ONE_WAY',
    `scheduleId` INTEGER NOT NULL,

    INDEX `Trip_scheduleId_idx`(`scheduleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
