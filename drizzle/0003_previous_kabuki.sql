ALTER TABLE `project` MODIFY COLUMN `outflow` text NOT NULL;--> statement-breakpoint
ALTER TABLE `project` MODIFY COLUMN `inflow` text NOT NULL;--> statement-breakpoint
ALTER TABLE `transactions` MODIFY COLUMN `amount` text NOT NULL;