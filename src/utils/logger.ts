import {LoggerService} from '@nestjs/common';
import {Logger} from '@subql/common';
import Pino from 'pino';

export const LogCategory = 'indexer-coordinator';

const logger = new Logger({level: 'info', outputFormat: 'colored', nestedKey: 'payload'});

export function getLogger(category: string): Pino.Logger {
  return logger.getLogger(category);
}

export function setLevel(level: Pino.LevelWithSilent): void {
  logger.setLevel(level);
}

export class NestLogger implements LoggerService {
  private logger = logger.getLogger('nestjs');

  error(message: any, trace?: string) {
    if (trace) {
      this.logger.error({trace}, message);
    } else {
      this.logger.error(message);
    }
  }

  log(message: any): any {
    this.logger.info(message);
  }

  warn(message: any): any {
    this.logger.warn(message);
  }
}
