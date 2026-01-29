import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.sub);

    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}