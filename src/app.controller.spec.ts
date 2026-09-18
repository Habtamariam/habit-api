// Imports Nest's testing utilities.
import { Test, TestingModule } from '@nestjs/testing';
// Imports the controller under test.
import { AppController } from './app.controller.js';
// Imports the controller dependency.
import { AppService } from './app.service.js';

// Groups unit tests for AppController.
describe('AppController', () => {
  // Stores the controller created for each test.
  let appController: AppController;

  // Creates a fresh testing module before each test.
  beforeEach(async () => {
    // Builds a lightweight Nest testing module.
    const app: TestingModule = await Test.createTestingModule({
      // Registers the controller under test.
      controllers: [AppController],
      // Registers its service dependency.
      providers: [AppService],
    }).compile();

    // Retrieves the controller from the testing container.
    appController = app.get<AppController>(AppController);
  });

  // Groups tests for the root route behavior.
  describe('root', () => {
    // Verifies the controller returns the expected message.
    it('should return "Hello World!"', () => {
      // Calls the controller and checks its result.
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
