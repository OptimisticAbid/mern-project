CREATE TABLE "url" (
	"url_count" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"long_url" varchar(255) NOT NULL,
	"short_url" varchar NOT NULL,
	CONSTRAINT "url_url_count_unique" UNIQUE("url_count"),
	CONSTRAINT "url_short_url_unique" UNIQUE("short_url")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"hashed_password" varchar NOT NULL,
	CONSTRAINT "user_id_unique" UNIQUE("id"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "url" ADD CONSTRAINT "url_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;