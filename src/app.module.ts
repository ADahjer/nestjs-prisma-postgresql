import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [AuthModule, UserModule, ProjectModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
