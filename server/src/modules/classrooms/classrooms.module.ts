import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Schemas
import { Classroom, ClassroomSchema } from './schemas/classroom.schema';
import { User, UserSchema } from '../users/schemas/user.schema';

// Controllers
import { ClassroomController } from './controllers/classroom.controller';
import { ClassroomMemberController } from './controllers/classroom-member.controller';
import { ClassroomEventController } from './controllers/classroom-event.controller';

// Services
import { ClassroomService } from './services/classroom.service';
import { ClassroomMemberService } from './services/classroom-member.service';
import { ClassroomEventService } from './services/classroom-event.service';
import { ClassroomHelperService } from './services/classroom-helper.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Classroom.name, schema: ClassroomSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [
    ClassroomController,
    ClassroomMemberController,
    ClassroomEventController,
  ],
  providers: [
    ClassroomService,
    ClassroomMemberService,
    ClassroomEventService,
    ClassroomHelperService,
  ],
  exports: [
    ClassroomService,
    ClassroomMemberService,
    ClassroomEventService,
    MongooseModule,
  ],
})
export class ClassroomsModule {}
