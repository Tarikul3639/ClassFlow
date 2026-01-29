import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RootModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(RootModule);

  const configService = app.get(ConfigService);

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
  // logger.log('✅ DATABASE_URL loaded successfully');

  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL') || 'http://localhost:5173',
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

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);

  logger.log(`🚀 Server running on: http://localhost:${port}/api`);
}

bootstrap();