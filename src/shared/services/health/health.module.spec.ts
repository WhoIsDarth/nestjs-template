import { mockDeep } from 'jest-mock-extended';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';

import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

import { HealthModule } from './health.module';

describe('HealthModule', () => {
  it('should compile the module', async () => {
    const healthModule: HealthModule = await Test.createTestingModule({
      imports: [HealthModule, PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    expect(healthModule).toBeDefined();
  });
});
