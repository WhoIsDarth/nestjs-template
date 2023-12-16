import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => ({
  title: process.env.SWAGGER_TITLE,
  path: process.env.SWAGGER_PATH,
  description: process.env.SWAGGER_DESCRIPTION,
  version: process.env.SWAGGER_VERSION,
  enabled: process.env.SWAGGER_ENABLED === 'true',
}));
