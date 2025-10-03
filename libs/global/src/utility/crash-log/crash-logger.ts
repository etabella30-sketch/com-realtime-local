import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CrashLoggerService {
  private logDirectory: string;
  private logFilePath: string;

  constructor() {
    this.logDirectory = path.join(__dirname, '..', '..', 'logs');
    this.logFilePath = path.join(this.logDirectory, 'app-crash.log');

    // Ensure the logs directory exists
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory, { recursive: true });
    }
  }

  logUncaughtException(err: Error) {
    const logMessage = `[${new Date().toISOString()}] [Uncaught Exception] ${err.message}\nStack: ${err.stack || 'N/A'}\n\n`;
    fs.appendFileSync(this.logFilePath, logMessage);
    console.error('Uncaught Exception:', err);
  }

  logUnhandledRejection(reason: any) {
    const logMessage = `[${new Date().toISOString()}] [Unhandled Rejection] ${reason}\n\n`;
    fs.appendFileSync(this.logFilePath, logMessage);
    console.error('Unhandled Rejection:', reason);
  }
}
