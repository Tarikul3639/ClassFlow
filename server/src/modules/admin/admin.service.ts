import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async create(createAdminDto: CreateAdminDto, creatorRole: string) {
    // Only ADMIN can create CO_ADMIN
    if (creatorRole !== 'admin') {
      throw new ForbiddenException('Only admin can create co-admin');
    }

    const existingAdmin = await this.adminModel.findOne({
      $or: [
        { email: createAdminDto.email },
        { adminId: createAdminDto.adminId },
      ],
    });

    if (existingAdmin) {
      throw new ConflictException('Admin email or ID already exists');
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    const admin = await this.adminModel.create({
      ...createAdminDto,
      password: hashedPassword,
    });

    return this.formatResponse(admin);
  }

  async findAll() {
    const admins = await this.adminModel.find().lean();
    return admins.map((a) => this.formatResponse(a));
  }

  async findOne(id: string) {
    const admin = await this.adminModel.findById(id).lean();

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return this.formatResponse(admin);
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel
      .findByIdAndUpdate(id, updateAdminDto, { new: true })
      .lean();

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return this.formatResponse(admin);
  }

  async remove(id: string, requesterRole: string) {
    if (requesterRole !== 'admin') {
      throw new ForbiddenException('Only admin can remove co-admin');
    }

    const admin = await this.adminModel.findByIdAndDelete(id);

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return { message: 'Admin removed successfully' };
  }

  private formatResponse(admin: any) {
    const { password, __v, ...rest } = admin;
    return rest;
  }
}