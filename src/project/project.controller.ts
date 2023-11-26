import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { ProjectService } from './project.service';
import { GetUSer } from '../auth/decorator';
import { CreateProjectDTO, EditProjectDTO } from './dto';
import { CreateTaskDTO } from './dto/create-tastk.dto';
import { EditTaskDTO } from './dto/edit-task.dto';

@UseGuards(JwtGuard)
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  async createProject(
    @GetUSer('id') userId: string,
    @Body() dto: CreateProjectDTO,
  ) {
    return await this.projectService.createProject(userId, dto);
  }

  @Get()
  async getProjects(@GetUSer('id') userId: string) {
    return await this.projectService.getProjects(userId);
  }

  @Get('/:projectId')
  async getProjectById(
    @GetUSer('id') userId: string,
    @Param('projectId') projectId: string,
  ) {
    return await this.projectService.getProjectById(userId, projectId);
  }

  @Patch('/:projectId')
  async updateProject(
    @GetUSer('id') userId: string,
    @Param('projectId') projectId: string,
    @Body() dto: EditProjectDTO,
  ) {
    return await this.projectService.updateProject(userId, projectId, dto);
  }

  @Delete('/:projectId')
  async deleteProject(
    @GetUSer('id') userId: string,
    @Param('projectId') projectId: string,
  ) {
    return await this.projectService.deleteProject(userId, projectId);
  }

  // Task routes
  @Post('/:projectId/tasks')
  async createTask(
    @GetUSer('id') userId: string,
    @Param('projectId') projectId: string,
    @Body() dto: CreateTaskDTO,
  ) {
    return await this.projectService.createTask(userId, projectId, dto);
  }

  @Patch('/:projectId/tasks/:taskId')
  async updateTask(
    @GetUSer('id') userId: string,
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Body() dto: EditTaskDTO,
  ) {
    return await this.projectService.updateTask(userId, projectId, taskId, dto);
  }

  @Delete('/:projectId/tasks/:taskId')
  async deleteTask(
    @GetUSer('id') userId: string,
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ) {
    return await this.projectService.deleteTask(userId, projectId, taskId);
  }
}
