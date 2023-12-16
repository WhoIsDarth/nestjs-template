import { mockDeep } from 'jest-mock-extended';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';

import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';

describe('StorageModule', () => {
  it('should compile the module', async () => {
    const prismaModule: PrismaModule = await Test.createTestingModule({
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    expect(prismaModule).toBeDefined();
  });
});
