import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service.js';
import { HabitsController } from './habits.controller.js';
import { DbModule } from '../db/db.module.js';

@Module({
  imports: [DbModule],
  controllers: [HabitsController],
  providers: [HabitsService],
})
export class HabitsModule {}
