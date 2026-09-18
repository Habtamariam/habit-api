import { Test, TestingModule } from '@nestjs/testing';
import { DRIZZLE } from '../db/db.module.js';
import { HabitsService } from './habits.service.js';

describe('HabitsService', () => {
  let service: HabitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HabitsService, { provide: DRIZZLE, useValue: {} }],
    }).compile();

    service = module.get<HabitsService>(HabitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
