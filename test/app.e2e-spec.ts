// Imports Nest testing utilities.
import { Test, TestingModule } from '@nestjs/testing';
// Imports the Nest application type.
import { INestApplication } from '@nestjs/common';
// Imports the HTTP request test client.
import request from 'supertest';
// Imports the Supertest application type.
import { App } from 'supertest/types';
// Imports the complete application module.
import { AppModule } from './../src/app.module.js';

// Groups end-to-end tests for the root controller.
describe('AppController (e2e)', () => {
  // Stores the application used by the HTTP tests.
  let app: INestApplication<App>;

  // Creates and initializes a real Nest application before each test.
  beforeEach(async () => {
    // Builds a testing module with the complete application module.
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // Creates the HTTP application instance.
    app = moduleFixture.createNestApplication();
    // Initializes routes and providers.
    await app.init();
  });

  // Verifies the root endpoint over HTTP.
  it('/ (GET)', () => {
    // Sends GET / and checks its status and response body.
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // Closes the application after each test.
  afterEach(async () => {
    await app.close();
  });
});
