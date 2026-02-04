import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RootModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(RootModule);

  const configService = app.get(ConfigService);

  // 🍪 Enable cookie parser
  app.use(cookieParser());
  logger.log('✅ Cookie parser enabled');

  // ✅ Verify JWT_SECRET is loaded
  const jwtSecret = configService.get<string>('JWT_SECRET');
  if (!jwtSecret) {
    logger.error('❌ JWT_SECRET is not set in .env file!');
    process.exit(1);
  }
  // logger.log('✅ JWT_SECRET loaded successfully');

  // ✅ Verify DATABASE_URL is loaded
  const dbUrl = configService.get<string>('DATABASE_URL');
  if (!dbUrl) {
    logger.error('❌ DATABASE_URL is not set in .env file!');
    process.exit(1);
  }

  // ✅ Handle multiple CORS origins
  const frontendUrls = (configService.get<string>('FRONTEND_URL') || '')
    .split(',')
    .map((url) => url.trim().replace(/\/$/, '')); // remove trailing slash if any

  // Add localhost and other URL manually
  frontendUrls.push(
    'http://localhost:3000',
    'https://class-flow-ruby.vercel.app',
  );

  app.enableCors({
    origin: frontendUrls,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix('api');

  const port = configService.get<number>('PORT', 5000);
  await app.listen(port);

  logger.log(`🚀 Server running on: http://localhost:${port}/api`);
}

bootstrap();
