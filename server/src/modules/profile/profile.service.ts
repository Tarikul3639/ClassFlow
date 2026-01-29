import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from '../student/schemas/student.schema';
import { Admin, AdminDocument } from '../admin/schemas/admin.schema';
import { UserRole } from '../../common/enums/user-role.enum';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async getProfile(userId: string, role: UserRole) {
    if (role === UserRole.STUDENT) {
      const student = await this.studentModel
        .findById(userId)
        .populate('classSectionId', 'name department intake section')
        .lean();

      if (!student) {
        throw new NotFoundException('Student profile not found');
      }

      return this.formatStudentProfile(student);
    }

    if (role === UserRole.ADMIN || role === UserRole.CO_ADMIN) {
      const admin = await this.adminModel
        .findById(userId)
        .populate('instituteId')
        .populate('departmentId')
        .populate('classSectionIds')
        .lean();

      if (!admin) {
        throw new NotFoundException('Admin profile not found');
      }

      return this.formatAdminProfile(admin);
    }

    throw new NotFoundException('Profile not found');
  }

  private formatStudentProfile(student: any) {
    return {
      _id: student._id.toString(),
      name: student.name,
      email: student.email,
      role: student.role,
      avatarUrl: student.avatarUrl,
      studentId: student.studentId,
      classSectionId: student.classSectionId?._id?.toString() || student.classSectionId,
      classInfo: student.classSectionId?._id ? {
        _id: student.classSectionId._id.toString(),
        name: student.classSectionId.name,
        department: student.classSectionId.department,
        intake: student.classSectionId.intake,
        section: student.classSectionId.section,
      } : undefined,
      department: student.department,
      intake: student.intake,
      section: student.section,
      phoneNumber: student.phoneNumber,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      address: student.address,
      guardianName: student.guardianName,
      guardianPhone: student.guardianPhone,
      bloodGroup: student.bloodGroup,
      enrollmentDate: student.enrollmentDate,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    };
  }

  private formatAdminProfile(admin: any) {
    return {
      _id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
      avatarUrl: admin.avatarUrl,
      adminId: admin.adminId,
      instituteId: admin.instituteId?._id?.toString(),
      departmentId: admin.departmentId?._id?.toString(),
      classSectionIds: admin.classSectionIds?.map((id: any) => id.toString()),
      permissions: admin.permissions,
      managedStudents: admin.managedStudents?.map((ms: any) => ({
        _id: ms._id.toString(),
        studentId: ms.studentId,
        adminId: ms.adminId,
        name: ms.name,
        email: ms.email,
        avatarUrl: ms.avatarUrl,
        blocked: ms.blocked,
        role: ms.role,
      })),
      phoneNumber: admin.phoneNumber,
      dateOfBirth: admin.dateOfBirth,
      gender: admin.gender,
      address: admin.address,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    };
  }
}