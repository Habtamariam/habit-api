// Imports Nest's injection, service, and 404 exception decorators.
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { and, eq } from 'drizzle-orm';
import { DRIZZLE } from '../db/db.module.js';
import * as schema from '../db/schema.js';
import { CreateHabitDto } from './dto/create-habit.dto.js';
import { UpdateHabitDto } from './dto/update-habit.dto.js';

// Makes this class available through Nest dependency injection.
@Injectable()
export class HabitsService {
  // Receives the Drizzle connection through its custom token.
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  // Inserts a new habit for the specified user.
  async create(userId: number, createHabitDto: CreateHabitDto) {
    const [habit] = await this.db
      .insert(schema.habits)
      .values({ userId, ...createHabitDto })
      .returning();

    return habit;
  }

  // Returns all habits belonging to the specified user.
  findAll(userId: number) {
    return this.db
      .select()
      .from(schema.habits)
      .where(eq(schema.habits.userId, userId));
  }

  // Finds one habit belonging to the specified user.
  async findOne(userId: number, id: number) {
    const [habit] = await this.db
      .select()
      .from(schema.habits)
      .where(and(eq(schema.habits.id, id), eq(schema.habits.userId, userId)));

    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    return habit;
  }

  // Updates selected fields for a user's habit.
  async update(userId: number, id: number, updateHabitDto: UpdateHabitDto) {
    const [habit] = await this.db
      .update(schema.habits)
      .set(updateHabitDto)
      .where(and(eq(schema.habits.id, id), eq(schema.habits.userId, userId)))
      .returning();

    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    return habit;
  }

  // Removes a user's habit from PostgreSQL.
  async remove(userId: number, id: number) {
    const deleted = await this.db
      .delete(schema.habits)
      .where(and(eq(schema.habits.id, id), eq(schema.habits.userId, userId)))
      .returning({ id: schema.habits.id, userId: schema.habits.userId });

    if (deleted.length === 0) {
      throw new NotFoundException('Habit not found');
    }

    return { deleted: true };
  }
}
