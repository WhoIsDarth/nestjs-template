import { Injectable, Logger } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
  private readonly logger = new Logger(PrismaHealthIndicator.name);

  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;

      return this.getStatus(key, true);
    } catch (err) {
      this.logger.error(err);
      throw new HealthCheckError('Prisma check failed', err);
    }
  }
}
