import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Catch()
export class CrashLoggingFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('CRASH INIT')
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : 500;

    const errorResponse = {
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        exception instanceof HttpException
          ? exception.message
          : 'Internal server error',
      stack: exception instanceof Error ? exception.stack : null,
    };

    // Log to console
    console.error('Application crash:', errorResponse);

    // Define log file path
    const logDirectory = path.join(__dirname, '..', 'logs');
    const logFilePath = path.join(logDirectory, 'app-crash.log');

    // Ensure the logs directory exists
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory, { recursive: true });
    }

    // Log to a file
    const logMessage = `[${errorResponse.timestamp}] [${status}] ${errorResponse.message}\nPath: ${errorResponse.path}\nStack: ${errorResponse.stack || 'N/A'}\n\n`;

    fs.appendFileSync(logFilePath, logMessage);

    // Return response to client
    response.status(status).json({
      statusCode: status,
      message: errorResponse.message,
    });
  }
}
