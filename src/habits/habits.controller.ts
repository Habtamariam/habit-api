import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HabitsService } from './habits.service.js';
import { CreateHabitDto } from './dto/create-habit.dto.js';
import { UpdateHabitDto } from './dto/update-habit.dto.js';

@Controller('habits')
export class HabitsController {
  // Uses a temporary user until JWT authentication is added.
  private readonly demoUserId = 1;

  constructor(private readonly habitsService: HabitsService) {}

  @Post()
  create(@Body() createHabitDto: CreateHabitDto) {
    return this.habitsService.create(this.demoUserId, createHabitDto);
  }

  @Get()
  findAll() {
    return this.habitsService.findAll(this.demoUserId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitsService.findOne(this.demoUserId, +id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitDto: UpdateHabitDto) {
    return this.habitsService.update(this.demoUserId, +id, updateHabitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitsService.remove(this.demoUserId, +id);
  }
}
