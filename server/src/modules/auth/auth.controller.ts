import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Req,
  UseGuards,
  Put,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AuthUser } from './interface/auth.interface';
import { ProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  // ---------------- AUTHENTICATION ----------------

  /**
   * Register a new user
   * @param dto - User registration data
   * @returns Authentication response with user data and token
   */
  @Public()
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: AuthUser }> {
    const { access_token, user } = await this.authService.register(dto);

    // Set HTTP-Only cookie for enhanced security
    this.setAuthCookie(res, access_token);

    return { user };
  }

  /**
   * Login existing user
   * @param dto - Login credentials
   * @param res - Response object to set cookies
   * @returns User data (token sent via HTTP-only cookie)
   */
  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: AuthUser }> {
    const { access_token, user } = await this.authService.login(dto);

    // Set HTTP-Only cookie
    this.setAuthCookie(res, access_token);

    return { user };
  }

  /**
   * Refresh access token
   * @param req - Request with current token
   * @param res - Response to set new cookie
   * @returns Success message
   */
  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ success: boolean; message: string }> {
    const newToken = await this.authService.refreshToken(req.user.userId);
    this.setAuthCookie(res, newToken);

    return {
      success: true,
      message: 'Token refreshed successfully',
    };
  }

  // ---------------- VERIFICATION ----------------

  /**
   * Verify current user's authentication status
   * @param req - Request with user data
   * @returns User verification status and data
   */
  @UseGuards(JwtAuthGuard)
  @Get('verify')
  @HttpCode(HttpStatus.OK)
  async verify(
    @Req() req: RequestWithUser,
  ): Promise<{ success: boolean; user: AuthUser }> {
    const user = await this.authService.validateUser(req.user.userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      success: true,
      user: this.mapUser(user),
    };
  }

  // ---------------- PROFILE MANAGEMENT ----------------

  /**
   * Get current user's profile
   * @param req - Request with user data
   * @returns User profile data
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: RequestWithUser): Promise<AuthUser> {
    const user = await this.authService.validateUser(req.user.userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.mapUser(user);
  }

  /**
   * Update user profile
   * @param req - Request with user data
   * @param dto - Profile update data
   * @returns Updated user data
   */
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Req() req: RequestWithUser,
    @Body() dto: ProfileDto,
  ): Promise<{ success: boolean; user: AuthUser }> {
    const user = await this.authService.updateProfile(req.user.userId, dto);

    return {
      success: true,
      user: this.mapUser(user),
    };
  }

  // ---------------- PASSWORD MANAGEMENT ----------------

  /**
   * Change user password
   * @param req - Request with user data
   * @param body - Current and new password
   * @returns Success message
   */
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Req() req: RequestWithUser,
    @Body() body: ChangePasswordDto,
  ): Promise<{ success: boolean; message: string }> {
    await this.authService.changePassword(
      req.user.userId,
      body.currentPassword,
      body.newPassword,
    );

    return {
      success: true,
      message: 'Password changed successfully',
    };
  }

  /**
   * Request password reset (send reset link to email)
   * @param body - Email address
   * @returns Success message
   */
  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(
    @Body('email') email: string,
  ): Promise<{ success: boolean; message: string }> {
    await this.authService.sendPasswordResetEmail(email);

    return {
      success: true,
      message: 'If the email exists, a password reset link has been sent',
    };
  }

  /**
   * Reset password using reset token
   * @param body - Reset token and new password
   * @returns Success message
   */
  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() body: { token: string; newPassword: string },
  ): Promise<{ success: boolean; message: string }> {
    await this.authService.resetPassword(body.token, body.newPassword);

    return {
      success: true,
      message: 'Password has been reset successfully',
    };
  }

  // ---------------- LOGOUT ----------------

  /**
   * Logout user and clear authentication cookie
   * @param req - Request with user data
   * @param res - Response to clear cookie
   * @returns Success message
   */
  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ success: boolean; message: string }> {
    // Optional: Add token to blacklist if you implement token blacklisting
    await this.authService.logout(req.user.userId);

    // Clear the authentication cookie
    this.clearAuthCookie(res);

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  // ---------------- HELPER METHODS ----------------

  /**
   * Map database user to AuthUser interface
   * @param user - User from database
   * @returns Formatted AuthUser object
   */
  private mapUser(user: any): AuthUser {
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl || null,
      classrooms: user.classrooms?.map((id: any) => id.toString()) || [],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Set authentication cookie
   * @param res - Response object
   * @param token - JWT access token
   */
  private setAuthCookie(res: Response, token: string): void {
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    // Frontend domain - যেখানে cookie store হবে
    const frontendDomain = isProduction
      ? '.class-flow-edu.vercel.app' // Important: dot for subdomain support
      : 'localhost';

    const cookieOptions: any = {
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    // Production environment requires explicit domain for cross-site cookies
    if (isProduction) {
      cookieOptions.domain = frontendDomain;
    }

    res.cookie('access_token', token, cookieOptions);

    console.log('🍪 Cookie set:', {
      domain: cookieOptions.domain,
      sameSite: cookieOptions.sameSite,
      secure: cookieOptions.secure,
      hasToken: !!token,
    });
  }

  /**
   * Clear authentication cookie
   * @param res - Response object
   */
  private clearAuthCookie(res: Response): void {
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    const cookieOptions: any = {
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
    };

    if (isProduction) {
      cookieOptions.domain = '.class-flow-edu.vercel.app';
    }

    res.clearCookie('access_token', cookieOptions);
  }
}
