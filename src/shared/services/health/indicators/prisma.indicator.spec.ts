import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { ConfigService } from '@nestjs/config';
import { HealthCheckError, TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { PrismaHealthIndicator } from './prisma.indicator';

describe('PrismaIndicator', () => {
  let prismaHealthIndicator: PrismaHealthIndicator;
  let prismaService: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [PrismaHealthIndicator],
      providers: [PrismaHealthIndicator, PrismaService, ConfigService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    prismaHealthIndicator = moduleRef.get(PrismaHealthIndicator);
    prismaService = moduleRef.get(PrismaService);
  });

  it('should be defined', () => {
    expect(prismaHealthIndicator).toBeDefined();
  });

  describe('check', () => {
    it('should check db status true', async () => {
      prismaService.$queryRaw.mockResolvedValue({});
      expect(await prismaHealthIndicator.isHealthy('db')).toBeTruthy();
    });
    it('should check db status false', async () => {
      prismaService.$queryRaw.mockRejectedValue({});
      try {
        await prismaHealthIndicator.isHealthy('db');
      } catch (err) {
        expect(err).toBeInstanceOf(HealthCheckError);
      }
    });
  });
});
