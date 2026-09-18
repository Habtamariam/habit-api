// Imports the controller and GET route decorators.
import { Controller, Get } from '@nestjs/common';
// Imports the service used by this controller.
import { AppService } from './app.service.js';

// Registers this class as an HTTP controller at the root path.
@Controller()
export class AppController {
  // Receives AppService through Nest dependency injection.
  constructor(private readonly appService: AppService) {}

  // Maps GET / requests to this method.
  @Get()
  // Returns a text response from the service.
  getHello(): string {
    // Delegates application logic to AppService.
    return this.appService.getHello();
  }
}
