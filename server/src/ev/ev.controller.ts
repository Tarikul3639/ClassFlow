import { Controller, Get } from '@nestjs/common';
import { EvService } from './ev.service';

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
}
