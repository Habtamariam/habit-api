// Imports validation rules for incoming habit data.
import { IsInt, IsString, Max, Min, MinLength } from 'class-validator';

// Defines the fields accepted when creating a habit.
export class CreateHabitDto {
	// Stores the habit's display name.
	@IsString()
	@MinLength(1)
	name!: string;

	// Stores the weekly target count.
	@IsInt()
	@Min(1)
	@Max(7)
	targetPerWeek!: number;
}
