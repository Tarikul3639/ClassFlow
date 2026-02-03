import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AuthResponse, AuthUser } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  @HttpCode(HttpStatus.OK)
  async verifyAuth(
    @Req() req: any,
  ): Promise<{ success: boolean; user: AuthUser }> {
    const userId = req.user.userId; // From JWT payload
    const user = await this.authService.validateUser(userId);

    return {
      success: true,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        classrooms: user.classrooms.map((id) => id.toString()),
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  async logout(): Promise<{ success: boolean; message: string }> {
    await this.authService.logout();
    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: any): Promise<AuthUser> {
    const userId = req.user.userId;
    const user = await this.authService.validateUser(userId);
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      classrooms: user.classrooms.map((id) => id.toString()),
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Req() req: any,
    @Body() body: { currentPassword: string; newPassword: string },
  ): Promise<{ success: boolean; message: string }> {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = body;
    await this.authService.changePassword(
      userId,
      currentPassword,
      newPassword,
    );
    return {
      success: true,
      message: 'Password changed successfully',
    };
  }
}
