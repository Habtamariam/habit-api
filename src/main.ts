// Imports Nest's application factory and validation pipe.
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// Imports the root module and telemetry instrumentation.
import { AppModule, ObserveInstrument } from './app.module.js';

// Creates and starts the HTTP application.
async function bootstrap() {
  // Builds the Nest application from the root module.
  const app = await NestFactory.create(AppModule, {
    // Enables Observe instrumentation for the application.
    instrument: ObserveInstrument,
  });
  // Validates DTOs and removes unexpected request fields.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  // Listens on the configured port or defaults to 3000.
  await app.listen(process.env.PORT ?? 3000);
}
// Runs the application bootstrap process.
await bootstrap();
