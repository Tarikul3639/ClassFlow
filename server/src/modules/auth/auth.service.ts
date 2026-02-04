import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User, UserDocument } from '../users/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponse, AuthUser } from './interface/auth.interface';
import { ProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 12;
  private readonly RESET_TOKEN_EXPIRY = 3600000; // 1 hour in milliseconds

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  // ---------------- AUTHENTICATION ----------------

  /**
   * Register a new user
   * @param registerDto - User registration data
   * @returns Authentication response with token and user data
   */
  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    // Check if email already exists
    const existingUser = await this.userModel.findOne({
      email: registerDto.email.toLowerCase(),
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password with increased salt rounds for better security
    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      this.SALT_ROUNDS,
    );

    // Create new user
    const user = await this.userModel.create({
      ...registerDto,
      email: registerDto.email.toLowerCase(),
      password: hashedPassword,
      classrooms: [],
      avatarUrl: registerDto.avatarUrl || null,
    });

    return this.generateAuthResponse(user);
  }

  /**
   * Login existing user
   * @param loginDto - Login credentials
   * @returns Authentication response with token and user data
   */
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    // Find user and include password field
    const user = await this.userModel
      .findOne({ email: loginDto.email.toLowerCase() })
      .select('+password');

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Update last login timestamp (if you have this field in schema)
    user.lastLoginAt = new Date();
    await user.save();

    return this.generateAuthResponse(user);
  }

  /**
   * Refresh user's access token
   * @param userId - User ID from current token
   * @returns New access token
   */
  async refreshToken(userId: string): Promise<string> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload = {
      sub: user._id.toString(),
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }

  // ---------------- VALIDATION ----------------

  /**
   * Validate user by ID
   * @param userId - User ID to validate
   * @returns User document without password
   */
  async validateUser(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId).select('-password');

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  // ---------------- PROFILE MANAGEMENT ----------------

  /**
   * Update user profile
   * @param userId - User ID
   * @param dto - Profile update data
   * @returns Updated user document
   */
  async updateProfile(
    userId: string,
    dto: ProfileDto,
  ): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update fields if provided
    if (dto.name !== undefined && dto.name.trim() !== '') {
      user.name = dto.name.trim();
    }

    if (dto.avatarUrl !== undefined) {
      user.avatarUrl = dto.avatarUrl;
    }

    await user.save();
    return user;
  }

  // ---------------- PASSWORD MANAGEMENT ----------------

  /**
   * Change user password
   * @param userId - User ID
   * @param currentPassword - Current password for verification
   * @param newPassword - New password to set
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    // Find user with password field
    const user = await this.userModel.findById(userId).select('+password');

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Check if new password is different from current
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new BadRequestException(
        'New password must be different from current password',
      );
    }

    // Hash and save new password
    const hashedNewPassword = await bcrypt.hash(
      newPassword,
      this.SALT_ROUNDS,
    );
    user.password = hashedNewPassword;
    await user.save();
  }

  /**
   * Send password reset email
   * @param email - User email address
   */
  async sendPasswordResetEmail(email: string): Promise<void> {
    const user = await this.userModel.findOne({
      email: email.toLowerCase(),
    });

    // Don't reveal if email exists for security
    if (!user) {
      // Log this for security monitoring but don't throw error
      console.log(`Password reset requested for non-existent email: ${email}`);
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Save hashed token and expiry to user
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + this.RESET_TOKEN_EXPIRY);
    await user.save();

    // TODO: Send email with reset link
    // const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    // await this.emailService.sendPasswordResetEmail(user.email, resetUrl);

    console.log(`Password reset token for ${email}: ${resetToken}`);
    // In production, you should integrate with an email service like SendGrid, Nodemailer, etc.
  }

  /**
   * Reset password using reset token
   * @param token - Reset token from email
   * @param newPassword - New password to set
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Hash the token to compare with stored hash
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with valid reset token
    const user = await this.userModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Hash and save new password
    const hashedPassword = await bcrypt.hash(newPassword, this.SALT_ROUNDS);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
  }

  // ---------------- LOGOUT ----------------

  /**
   * Logout user
   * @param userId - User ID
   */
  async logout(userId: string): Promise<{ success: boolean }> {
    // For stateless JWT, server-side logic is optional
    // You can implement token blacklisting here if needed
    // Example: await this.tokenBlacklistService.addToken(token);

    // Optional: Update last logout timestamp
    const user = await this.userModel.findById(userId);
    if (user) {
      user.lastLogoutAt = new Date();
      await user.save();
    }

    return { success: true };
  }

  // ---------------- HELPER METHODS ----------------

  /**
   * Generate authentication response with JWT token
   * @param user - User document
   * @returns Authentication response object
   */
  private generateAuthResponse(user: UserDocument): AuthResponse {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      userId: user._id.toString(), // Added for easier extraction in guards
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      user: this.mapUserToAuthUser(user),
    };
  }

  /**
   * Map UserDocument to AuthUser interface
   * @param user - User document from database
   * @returns Formatted AuthUser object
   */
  private mapUserToAuthUser(user: UserDocument): AuthUser {
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl || null,
      classrooms: user.classrooms?.map((id) => id.toString()) || [],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Validate password strength (optional - can be used in DTOs with custom validator)
   * @param password - Password to validate
   * @returns Boolean indicating if password is strong enough
   */
  validatePasswordStrength(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  }
}