import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProjectDTO, EditProjectDTO } from './dto';
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
}
