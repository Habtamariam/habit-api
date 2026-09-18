// Makes create DTO fields optional for PATCH requests.
import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitDto } from './create-habit.dto.js';

// Reuses the create validation rules with optional fields.
export class UpdateHabitDto extends PartialType(CreateHabitDto) {}
