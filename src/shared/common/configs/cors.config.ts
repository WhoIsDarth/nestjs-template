import { registerAs } from '@nestjs/config';

export default registerAs('cors', () => ({
  enabled: process.env.CORS_ENABLED === 'true',
  methods: process.env.CORS_METHODS.split(','),
  origins: process.env.CORS_ORIGINS.split(','),
  credentials: process.env.CORS_CREDENTIALS === 'true',
}));
