CREATE TABLE `churches` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`denomination` text NOT NULL,
	`address` text NOT NULL,
	`area` text NOT NULL,
	`longitude` real NOT NULL,
	`latitude` real NOT NULL,
	`established` integer,
	`services` text,
	`phone` text,
	`website` text
);
