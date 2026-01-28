import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EvService {
  constructor(private configService: ConfigService) {}

  /**
   * Safe to expose non-sensitive config
   */
  getFrontendUrl(): string {
    const url = this.configService.get<string>('FRONTEND_URL');
    if (!url) {
      throw new Error('FRONTEND_URL is not defined in environment variables');
    }
    return url;
  }

  /**
   * Sensitive config access
   * Never return this via API
   */
  getDatabaseUrl(): string {
    const dbUrl = this.configService.get<string>('DATABASE_URL');
    if (!dbUrl) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }
    return dbUrl;
  }
}
