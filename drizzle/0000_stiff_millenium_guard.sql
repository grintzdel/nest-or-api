CREATE TABLE "desserts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" double precision NOT NULL,
	"available" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drinks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" double precision NOT NULL,
	"size" varchar(50) NOT NULL,
	"with_alcohol" boolean DEFAULT false NOT NULL,
	"available" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"pizzas" integer[] DEFAULT '{}' NOT NULL,
	"drinks" integer[] DEFAULT '{}' NOT NULL,
	"desserts" integer[] DEFAULT '{}' NOT NULL,
	"total_price" double precision NOT NULL,
	"processed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pizzas" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" double precision NOT NULL,
	"ingredients" text[] NOT NULL,
	"available" boolean DEFAULT true NOT NULL
);
