import { sql } from "drizzle-orm";
import {AnyPgColumn, integer, pgTable, serial, text} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm/relations";

export const usersTable = pgTable("users", {
    id: serial("id").unique().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    // TODO settings
});


export const usersRelation = relations(usersTable, ({many}) => ({
    boardsTable: many(boardsTable),
}));

export const boardsTable = pgTable("boards", {
    id: serial("id").unique().primaryKey(),
    owner: integer("ownerId"),
    name: text("name").notNull(),
})

export const boardsRelation = relations(boardsTable, ({many, one}) => ({
    sleeveTable: many(sleeveTable),
    owner: one(usersTable, {
        fields: [boardsTable.owner],
        references: [usersTable.id],
    }),
}));

export const sleeveTable = pgTable("sleeves", {
    id: serial("id").unique().primaryKey(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    summary: text("summary"),
    tags: text("tags").array().default(sql`'{}'::text[]`),
    position_x: integer("position_x").notNull(),
    position_y: integer("position_y").notNull(),
    board: integer()
});

export const sleeveRelation = relations(sleeveTable, ({one}) => ({
    owner: one(boardsTable, {
        fields: [sleeveTable.board],
        references: [boardsTable.id],
    }),
}));
