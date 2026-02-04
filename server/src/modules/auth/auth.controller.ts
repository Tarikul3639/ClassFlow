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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AuthResponse, AuthUser } from './interface/auth.interface';
import { ProfileDto } from './dto/update-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ---------------- AUTH ----------------

  @Public()
  @Post('sign-up')
  async register(@Body() dto: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(dto);
  }

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(dto);
  }

  // ---------------- VERIFY ----------------

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verify(@Req() req: any) {
    const user = await this.authService.validateUser(req.user.userId);
    return {
      success: true,
      user: this.mapUser(user),
    };
  }

  // ---------------- PROFILE ----------------

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: any): Promise<AuthUser> {
    const user = await this.authService.validateUser(req.user.userId);
    return this.mapUser(user);
  }

  // PROFILE UPDATE (NO MULTER)
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(
    @Req() req: any,
    @Body() dto: ProfileDto,
  ): Promise<AuthUser> {
    const user = await this.authService.updateProfile(req.user.userId, dto);
    return this.mapUser(user);
  }

  // ---------------- PASSWORD ----------------

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Req() req: any,
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    await this.authService.changePassword(
      req.user.userId,
      body.currentPassword,
      body.newPassword,
    );
    return { success: true, message: 'Password changed successfully' };
  }

  // ---------------- LOGOUT ----------------

  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  async logout() {
    await this.authService.logout();
    return { success: true, message: 'Logged out successfully' };
  }

  // ---------------- HELPER ----------------

  private mapUser(user: any): AuthUser {
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      classrooms: user.classrooms?.map((id) => id.toString()) || [],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
