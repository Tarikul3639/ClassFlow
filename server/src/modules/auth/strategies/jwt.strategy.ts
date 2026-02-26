import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const secret =
      configService.get<string>('JWT_SECRET') ||
      'default-secret-key-only-for-development-min-32-chars';

    // Warn in production if using default secret
    if (
      configService.get<string>('NODE_ENV') === 'production' &&
      !configService.get<string>('JWT_SECRET')
    ) {
      throw new Error('JWT_SECRET must be set in production environment!');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Extract from Authorization header first
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // Fallback to cookie for backward compatibility
        (request: Request) => {
          const token = request?.cookies?.access_token;
          if (token) {
            console.log('🍪 Token extracted from cookie (legacy)');
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    // Validate that user still exists in database
    const user = await this.authService.validateUser(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Return user data - this will be attached to req.user
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
