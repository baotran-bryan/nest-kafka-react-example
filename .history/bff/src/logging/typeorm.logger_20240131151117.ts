import { Logger as NestLogger } from '@nestjs/common';
import { highlight } from 'cli-highlight';
import { Logger } from 'typeorm';

// Ref. https://github.com/typeorm/typeorm/blob/master/src/logger/AdvancedConsoleLogger.ts
class TypeOrmLogger implements TypeOrmDefaultLogger {
  private readonly logger = new NestLogger('TypeORM');

  logQuery(query: string, parameters?: unknown[]) {
    this.logger.log(this.buildHighlightedSQL(query, parameters));
  }

  logQueryError(error: string, query: string, parameters?: unknown[]) {
    this.logger.error(
      `${this.buildHighlightedSQL(query, parameters)} -- ${error}`,
      {},
    );
  }

  logQuerySlow(time: number, query: string, parameters?: unknown[]) {
    this.logger.warn(
      `query is slow(${time}): ${this.buildHighlightedSQL(query, parameters)}`,
    );
  }

  logMigration(message: string) {
    this.logger.log(message);
  }

  logSchemaBuild(_message: string) {
    // Do not print schema
    // this.logger.log(message);
  }

  log(level: 'log' | 'info' | 'warn', message: string) {
    // Print only internal warnings as a debug messages
    if (level === 'warn') {
      return this.logger.debug(message);
    }
  }

  private stringifyParameters(parameters?: unknown[]): string {
    if (parameters === undefined || parameters.length === 0) return '';

    try {
      return ` -- PARAMETERS: ${JSON.stringify(parameters)}`;
    } catch {
      return '';
    }
  }

  private buildHighlightedSQL(query: string, parameters?: unknown[]): string {
    return highlight(`${query}${this.stringifyParameters(parameters)}`, {
      language: 'sql',
    });
  }
}

export default TypeOrmLogger;
