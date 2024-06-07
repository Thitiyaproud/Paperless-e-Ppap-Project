-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role` ENUM('ADMIN', 'SUPPLIER') NOT NULL DEFAULT 'SUPPLIER',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Production` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `partNo` VARCHAR(191) NOT NULL,
    `supplierName` VARCHAR(191) NOT NULL,
    `modelName` VARCHAR(191) NOT NULL,
    `partName` VARCHAR(191) NOT NULL,
    `SCD` VARCHAR(191) NULL,
    `APQP` VARCHAR(191) NULL,
    `NHKsPD` VARCHAR(191) NULL,
    `ECR` VARCHAR(191) NULL,
    `DFMEA` VARCHAR(191) NULL,
    `PFD` VARCHAR(191) NULL,
    `PFMEA` VARCHAR(191) NULL,
    `ControlPlan` VARCHAR(191) NULL,
    `MSA` VARCHAR(191) NULL,
    `InspectionStandard` VARCHAR(191) NULL,
    `InspectDataResult` VARCHAR(191) NULL,
    `MaterialPerFormanceTest` VARCHAR(191) NULL,
    `CP_CPK` VARCHAR(191) NULL,
    `Labdoc` VARCHAR(191) NULL,
    `AAR` VARCHAR(191) NULL,
    `MasterSample` VARCHAR(191) NULL,
    `CheckingAids` VARCHAR(191) NULL,
    `PSW` VARCHAR(191) NULL,
    `RiskAnalysis` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Production_partNo_key`(`partNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
