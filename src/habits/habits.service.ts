// Imports Nest's service and 404 exception decorators.
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto.js';
import { UpdateHabitDto } from './dto/update-habit.dto.js';

// Represents the data returned for a habit.
type Habit = CreateHabitDto & {
  id: number;
  active: boolean;
};

// Makes this class available through Nest dependency injection.
@Injectable()
export class HabitsService {
  // Stores habits temporarily in application memory.
  private habits: Habit[] = [];

  // Provides the next unique habit ID.
  private nextId = 1;

  // Creates and stores a new active habit.
  create(createHabitDto: CreateHabitDto) {
    // Combines generated fields with the request data.
    const habit: Habit = {
      id: this.nextId++,
      active: true,
      ...createHabitDto,
    };

    // Adds the new habit to memory.
    this.habits.push(habit);

    // Returns the created habit.
    return habit;
  }

  // Returns every stored habit.
  findAll() {
    return this.habits;
  }

  // Finds one habit or returns an HTTP 404 error.
  findOne(id: number) {
    // Searches for a habit with the requested ID.
    const habit = this.habits.find((item) => item.id === id);

    // Converts a missing habit into a 404 response.
    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    // Returns the matching habit.
    return habit;
  }

  // Updates selected fields on an existing habit.
  update(id: number, updateHabitDto: UpdateHabitDto) {
    // Reuses the lookup and 404 behavior.
    const habit = this.findOne(id);

    // Copies only supplied fields onto the habit.
    Object.assign(habit, updateHabitDto);

    // Returns the updated habit.
    return habit;
  }

  // Removes a habit from memory.
  remove(id: number) {
    // Keeps every habit except the requested one.
    this.habits = this.habits.filter((habit) => habit.id !== id);

    // Confirms the delete operation.
    return { deleted: true };
  }
}
