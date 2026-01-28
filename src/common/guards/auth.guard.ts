// src/common/guards/auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    
    // Example: token from cookies
    const token = request.cookies['token'];
    
    if (!token) {
      throw new UnauthorizedException('You must be logged in');
    }

    // TODO: validate JWT or session here if needed
    return true; // allow access if token exists
  }
}
