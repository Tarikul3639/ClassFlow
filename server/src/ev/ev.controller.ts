import { Controller, Get, UseGuards } from '@nestjs/common';
import { EvService } from './ev.service';
import { AuthGuard } from '@/common/guards';

@Controller('ev')
export class EvController {
  constructor(private readonly evService: EvService) {}

  /**
   * Safe route, anyone can access frontend URL
   */
  @Get('frontend-url')
  getFrontendUrl() {
    return { frontendUrl: this.evService.getFrontendUrl() };
  }

  /**
   * Sensitive route (example)
   * Only accessible to authenticated admin
   */
  @UseGuards(AuthGuard)
  @Get('database-url')
  getDatabaseUrl() {
    return { databaseUrl: this.evService.getDatabaseUrl() };
  }
}
