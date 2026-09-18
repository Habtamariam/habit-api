// Imports the injectable decorator.
import { Injectable } from '@nestjs/common';

// Makes this class available through Nest dependency injection.
@Injectable()
export class AppService {
  // Provides the response used by the root route.
  getHello(): string {
    // Returns the starter response.
    return 'Hello World!';
  }
}
