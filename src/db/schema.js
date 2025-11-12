import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { randomUUID } from 'crypto';

export const questionstable = sqliteTable("questions", {
    id: text().primaryKey().$defaultFn(randomUUID),
    questionText: text("question_text", { length: 300 }).notNull(),
    answer: text({ length: 300 }).notNull(),
    difficulty: text({ enum: ["easy", "medium", "difficult"] }).notNull().default("easy"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
    author: text().references(() => usersTable.id, { onDelete: "cascade" }).notNull()
});

export const usersTable = sqliteTable("users", {
    id: text().primaryKey().$defaultFn(randomUUID),
    email: text().notNull().unique(),
    username: text({ length: 30 }).notNull(),
    password: text({ length: 255 }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date())
});