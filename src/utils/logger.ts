// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { LoggerService } from '@nestjs/common';
import { Logger } from '@subql/common';
import Pino from 'pino';

export enum LogCategory {
  coordinator = 'indexer-coordinator',
  admin = 'indexer-admin',
}

export enum TextColor {
  RED = 31,
  GREEN,
  YELLOW,
  BLUE,
  MAGENTA,
  CYAN,
}

export function colorText(text: string, color = TextColor.BLUE): string {
  return `\u001b[${color}m${text}\u001b[39m`;
}

const logger = new Logger({ level: 'info', outputFormat: 'colored', nestedKey: 'payload' });

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
      this.logger.error({ trace }, message);
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
