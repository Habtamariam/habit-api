// Imports the module decorator.
import { Module } from '@nestjs/common';
// Imports the Observe module factory.
import { createObserveModule } from '@nestjs/observe';
// Imports the root controller.
import { AppController } from './app.controller.js';
// Imports the root service.
import { AppService } from './app.service.js';

// Creates telemetry components for the application.
export const { ObserveModule, ObserveInstrument } = createObserveModule();

// Declares this class as a NestJS module.
@Module({
  // Registers modules used by this module.
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'habit-api',
    }),
  ],
  // Registers classes that handle HTTP requests.
  controllers: [AppController],
  // Registers injectable business-logic classes.
  providers: [AppService],
})
// Defines the application's root module.
export class AppModule {}
