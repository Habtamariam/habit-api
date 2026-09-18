// Imports the tools needed to catch and format all HTTP errors.
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

// Catches every exception thrown during request handling.
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  // Creates a logger named after this filter.
  private readonly logger = new Logger(AllExceptionsFilter.name);

  // Logs the exception and sends a consistent JSON response.
  catch(exception: unknown, host: ArgumentsHost) {
    // Switches from the generic context to HTTP context.
    const context = host.switchToHttp();
    // Gets the response object used to send the result.
    const response = context.getResponse();

    // Uses the exception status or falls back to HTTP 500.
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Uses the Nest error response or a generic safe message.
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Records the exception in the NestJS logs.
    this.logger.error(exception);

    // Sends the normalized error response to the client.
    response.status(status).json({ statusCode: status, message });
  }
}
