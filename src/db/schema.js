import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { randomUUID } from 'crypto';

export const questionstable = sqliteTable("questions", {
    id: text().primaryKey().$defaultFn(randomUUID),
    questionText: text("question_text", { length: 300 }).notNull(),
    answer: text({ length: 300 }).notNull(),
    difficulty: text({ enum: ["easy", "medium", "difficult"] }).notNull().default("easy"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
    author: text().references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
    category: text().references(() => categoriesTable.id, { onDelete: "set null" })
});

export const usersTable = sqliteTable("users", {
    id: text().primaryKey().$defaultFn(randomUUID),
    email: text().notNull().unique(),
    username: text({ length: 30 }).notNull(),
    password: text({ length: 255 }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
    role: text().default("USER")
});

export const categoriesTable = sqliteTable("categories", {
    id: text().primaryKey().$defaultFn(randomUUID),
    title: text({ length: 30 }).notNull().unique(),
    description: text({ length: 300 }).notNull()
});