import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './entities/project.entity';
import {
  createProjectTemplateById,
  deleteProjectById,
  getConfigDB,
} from '../helper/project-template-helper';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = await this.projectRepository.create(createProjectDto);
    await createProjectTemplateById(project?.id);
    return project;
  }

  async findAll() {
    const projects = await this.projectRepository.findAll();
    return projects;
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({ where: { id } });
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({
      where: { id },
    });
    const updatedProject = await project.update(updateProjectDto);
    return updatedProject;
  }

  async remove(id: number) {
    const deletedProject = await this.projectRepository.destroy({
      where: { id },
    });
    await deleteProjectById(id);
    return Boolean(deletedProject);
  }
  async getModels(id: number) {
    return await getConfigDB(id);
  }
}
