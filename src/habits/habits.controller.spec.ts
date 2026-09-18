import { Test, TestingModule } from '@nestjs/testing';
import { HabitsController } from './habits.controller.js';
import { HabitsService } from './habits.service.js';
import { DRIZZLE } from '../db/db.module.js';

describe('HabitsController', () => {
  let controller: HabitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitsController],
      providers: [HabitsService, { provide: DRIZZLE, useValue: {} }],
    }).compile();

    controller = module.get<HabitsController>(HabitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
