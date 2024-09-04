CREATE TABLE `organisation` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` text,
	`datetime` datetime,
	CONSTRAINT `organisation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` text,
	`description` text,
	`outflow` text,
	`inflow` text,
	`balance` text,
	`organisationId` bigint,
	CONSTRAINT `project_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`sender` text,
	`reciever` text,
	`amount` text,
	`datetime` datetime,
	`projectId` bigint,
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `project` ADD CONSTRAINT `project_organisationId_organisation_id_fk` FOREIGN KEY (`organisationId`) REFERENCES `organisation`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_projectId_project_id_fk` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE no action ON UPDATE no action;