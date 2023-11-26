import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  CreateProjectDTO,
  EditProjectDTO,
  CreateTaskDTO,
  EditTaskDTO,
} from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProjectService {
  constructor(private prismaService: PrismaService) {}

  async createProject(userId: string, dto: CreateProjectDTO) {
    const project = await this.prismaService.project.create({
      data: {
        ...dto,
        owner: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return project;
  }

  async getProjects(userId: string) {
    const projects = await this.prismaService.project.findMany({
      where: {
        ownerId: userId,
      },
    });

    return projects;
  }

  async getProjectById(userId: string, projectId: string) {
    const project = await this.prismaService.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
      include: {
        tasks: true,
      },
    });

    if (!project) {
      throw new UnauthorizedException(
        'You are not authorized to access this project',
      );
    }

    return project;
  }

  async updateProject(userId: string, projectId: string, dto: EditProjectDTO) {
    try {
      const project = await this.prismaService.project.update({
        where: {
          ownerId: userId,
          id: projectId,
        },
        data: {
          ...dto,
        },
      });

      return project;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UnauthorizedException(
            'You are not authorized to access this project',
          );
        }
      }
    }
  }

  async deleteProject(userId: string, projectId: string) {
    try {
      const project = await this.prismaService.project.delete({
        where: {
          ownerId: userId,
          id: projectId,
        },
      });

      return project;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UnauthorizedException(
            'You are not authorized to access this project',
          );
        }
      }
    }
  }

  // Task routes
  async createTask(userId: string, projectId: string, dto: CreateTaskDTO) {
    // Check if project exists and user is owner
    const project = await this.prismaService.project.findUnique({
      where: {
        ownerId: userId,
        id: projectId,
      },
    });

    if (!project) {
      throw new UnauthorizedException(
        'You are not authorized to access this project',
      );
    }

    // Create task
    const task = await this.prismaService.task.create({
      data: {
        ...dto,
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });

    // Return task
    return task;
  }

  async updateTask(
    userId: string,
    projectId: string,
    taskId: string,
    dto: EditTaskDTO,
  ) {
    // Check if project exists and user is owner
    const project = await this.prismaService.project.findUnique({
      where: {
        ownerId: userId,
        id: projectId,
      },
    });

    if (!project) {
      throw new UnauthorizedException(
        'You are not authorized to access this project',
      );
    }

    // Update task
    const task = await this.prismaService.task.update({
      where: {
        id: taskId,
        project: {
          ownerId: userId,
          id: projectId,
        },
      },
      data: {
        ...dto,
      },
    });

    // Return task
    return task;
  }

  async deleteTask(userId: string, projectId: string, taskId: string) {
    // Check if project exists and user is owner
    const project = await this.prismaService.project.findUnique({
      where: {
        ownerId: userId,
        id: projectId,
      },
    });

    if (!project) {
      throw new UnauthorizedException(
        'You are not authorized to access this project',
      );
    }

    // Delete task
    const task = await this.prismaService.task.delete({
      where: {
        id: taskId,
        project: {
          ownerId: userId,
          id: projectId,
        },
      },
    });

    // Return task
    return task;
  }
}
