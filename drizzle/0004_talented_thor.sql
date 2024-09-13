ALTER TABLE `organisation` ADD `createdAt` timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE `organisation` DROP COLUMN `datetime`;