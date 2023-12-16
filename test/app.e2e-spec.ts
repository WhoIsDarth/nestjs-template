import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from './../src/app.module';

describe('TemplateController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/template (GET)', () => {
    return request(app.getHttpServer())
      .get('/template')
      .expect(200)
      .expect({ message: 'Hello World!' });
  });
});
