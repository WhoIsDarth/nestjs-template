import { Controller, Get } from '@nestjs/common';

import { HelloDto } from './dto';

@Controller('template')
export class TemplateController {
  @Get()
  getHello(): HelloDto {
    return { message: 'Hello World!' };
  }
}
