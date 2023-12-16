import { LogLevel, ValidationPipe, INestApplication } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import baseConfig from './shared/common/configs/base.config';
import corsConfig from './shared/common/configs/cors.config';
import swaggerConfig from './shared/common/configs/swagger.config';

async function bootstrap(): Promise<void> {
  const app = await createNestApplication();
  const configService = app.get(ConfigService);

  setupCors(app, configService);
  setGlobalPrefix(app);
  setupValidation(app);
  setupSwagger(app, configService);

  await startApplication(app, configService);
}

async function createNestApplication(): Promise<INestApplication> {
  return await NestFactory.create(AppModule, {
    logger: getLogLevels(),
  });
}

function getLogLevels(): LogLevel[] {
  return process.env.NODE_ENV === 'production'
    ? ['log', 'error', 'warn']
    : ['log', 'error', 'warn', 'debug', 'verbose'];
}

function setupCors(app: INestApplication, configService: ConfigService): void {
  const cors = configService.get<ConfigType<typeof corsConfig>>('cors');
  if (cors.enabled) {
    app.enableCors({
      origin: cors.origins,
      methods: cors.methods,
      credentials: cors.credentials,
    });
  }
}

function setGlobalPrefix(app: INestApplication): void {
  app.setGlobalPrefix('/api/v1', { exclude: ['health'] });
}

function setupValidation(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
}

function setupSwagger(
  app: INestApplication,
  configService: ConfigService,
): void {
  const swagger =
    configService.get<ConfigType<typeof swaggerConfig>>('swagger');
  if (swagger.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swagger.title)
      .setDescription(swagger.description)
      .setVersion(swagger.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swagger.path, app, document);
  }
}

async function startApplication(
  app: INestApplication,
  configService: ConfigService,
): Promise<void> {
  const base = configService.get<ConfigType<typeof baseConfig>>('base');
  await app.startAllMicroservices();
  await app.listen(base.port || 3000);
}

bootstrap();
