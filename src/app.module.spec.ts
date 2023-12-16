import { mockDeep } from 'jest-mock-extended';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';

import { AppModule } from './app.module';
import { PrismaModule } from './shared/services/prisma/prisma.module';
import { PrismaService } from './shared/services/prisma/prisma.service';

describe('AppModule', () => {
  process.env.CORS_METHODS = '*';
  process.env.CORS_ORIGINS = 'http://localhost:8080';
  process.env.CORS_CREDENTIALS = 'true';
  process.env.NODE_ENV = 'test';

  it('should compile the module', async () => {
    const appModule: AppModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    expect(appModule).toBeDefined();
  });
});
