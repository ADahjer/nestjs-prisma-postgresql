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
}
