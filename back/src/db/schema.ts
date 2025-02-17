import { sql } from "drizzle-orm";
import { AnyPgColumn, integer, pgTable, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer("id").unique().notNull().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    // tags
});

export const binderTable = pgTable("binders", {
    id: integer("id").unique().notNull().primaryKey(),  
    summary: text("summary"),
    category: integer().references((): AnyPgColumn => categoryTable.id),
    tags: text("tags").array().default(sql`'{}'::text[]`),
    creator: integer().notNull().references((): AnyPgColumn => usersTable.id),
    collaborators: integer().array().default(sql`'{}'::integer[]`)
    //notes
})

export const categoryTable = pgTable("categories", {
    id: integer("id").unique().notNull().primaryKey(),
    name: text("name").notNull(),
})
