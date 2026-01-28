import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EvService } from './ev/ev.service';
import { EvController } from './ev/ev.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule],
  controllers: [EvController],
  providers: [EvService],
})
export class RootModule {}
