// Imports PostgreSQL table and column builders from Drizzle.
import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

// Stores the habits owned by users.
export const habits = pgTable('habits', {
  // Creates an auto-incrementing primary key.
  id: serial('id').primaryKey(),
  // Identifies the user who owns the habit.
  userId: integer('user_id').notNull(),
  // Stores the habit name.
  name: varchar('name', { length: 255 }).notNull(),
  // Sets the weekly completion target.
  targetPerWeek: integer('target_per_week').notNull().default(7),
  // Tracks whether the habit is currently active.
  active: boolean('active').notNull().default(true),
  // Records when the habit was created.
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Stores one completion record for each habit and date.
export const habitLogs = pgTable('habit_logs', {
  // Creates an auto-incrementing log primary key.
  id: serial('id').primaryKey(),
  // Identifies the completed habit.
  habitId: integer('habit_id').notNull(),
  // Stores the calendar date of completion.
  completedOn: date('completed_on').notNull(),
});
