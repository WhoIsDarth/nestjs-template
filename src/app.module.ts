import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { TemplateModule } from './api/template/template.module';
import baseConfig from './shared/common/configs/base.config';
import corsConfig from './shared/common/configs/cors.config';
import swaggerConfig from './shared/common/configs/swagger.config';
import { DefaultFilter } from './shared/common/filters/default.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [baseConfig, swaggerConfig, corsConfig],
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? `/etc/conf/svc/.${process.env.NODE_ENV}.env`
          : `.${process.env.NODE_ENV}.env`,
    }),
    TemplateModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DefaultFilter,
    },
  ],
})
export class AppModule {}
