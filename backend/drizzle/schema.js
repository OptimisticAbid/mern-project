import { pgTable, serial, uuid, varchar, timestamp, integer ,text } from "drizzle-orm/pg-core";


export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    name: varchar("name").notNull(),
    email: varchar("email",{ length: 255 }).notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const urls = pgTable("urls", {
    id: uuid("id").primaryKey().unique(),
    userId: uuid("user_id").notNull().references(() => users.id),
    longUrl: varchar("long_url",{ length: 255 }).notNull(),
    shortUrl: varchar("short_url").notNull().unique(),
    clickCount: integer("click_count").default(0).notNull(),
    expiresAt: timestamp("expires_at"),
    createdAt : timestamp("created_at").defaultNow().notNull(),
})

export const clicks = pgTable("clicks", {
    id: uuid("id").defaultRandom().primaryKey(),
    urlId: uuid("url_id").notNull().
        references( () => urls.id, {onDelete: "cascade"}),
    clickedAt: timestamp("clicked_at").defaultNow().notNull(),
    
})
