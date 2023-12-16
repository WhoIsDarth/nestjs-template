import { mockDeep } from 'jest-mock-extended';
import { ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { HealthController } from './health.controller';
import { PrismaHealthIndicator } from './indicators/prisma.indicator';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
      providers: [PrismaHealthIndicator, PrismaService, ConfigService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    healthController = moduleRef.get(HealthController);
  });

  it('should be defined', () => {
    expect(healthController).toBeDefined();
  });

  describe('check', () => {
    it('should check db status', async () => {
      expect(await healthController.check()).toBeTruthy();
    });
  });
});
