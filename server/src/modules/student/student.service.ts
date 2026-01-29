import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Student, StudentDocument } from './schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UserRole } from '../../common/enums/user-role.enum';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const existingStudent = await this.studentModel.findOne({
      $or: [
        { email: createStudentDto.email },
        { studentId: createStudentDto.studentId },
      ],
    });

    if (existingStudent) {
      throw new ConflictException('Student email or ID already exists');
    }

    const hashedPassword = await bcrypt.hash(createStudentDto.password, 10);

    const student = await this.studentModel.create({
      ...createStudentDto,
      password: hashedPassword,
      role: UserRole.STUDENT,
    });

    return this.formatResponse(student);
  }

  async findAll(query: any = {}) {
    const students = await this.studentModel
      .find(query)
      .populate('classSectionId')
      .lean();

    return students.map((s) => this.formatResponse(s));
  }

  async findOne(id: string) {
    const student = await this.studentModel
      .findById(id)
      .populate('classSectionId')
      .lean();

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return this.formatResponse(student);
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentModel
      .findByIdAndUpdate(id, updateStudentDto, { new: true })
      .populate('classSectionId')
      .lean();

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return this.formatResponse(student);
  }

  async block(id: string) {
    const student = await this.studentModel.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true },
    );

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return { message: 'Student blocked successfully' };
  }

  async unblock(id: string) {
    const student = await this.studentModel.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true },
    );

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return { message: 'Student unblocked successfully' };
  }

  private formatResponse(student: any) {
    const { password, __v, ...rest } = student;
    return rest;
  }
}