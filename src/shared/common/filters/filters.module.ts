import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DefaultFilter } from './default.filter';

@Module({
  imports: [ConfigModule],
  providers: [DefaultFilter],
  exports: [DefaultFilter],
})
export class FiltersModule {}
