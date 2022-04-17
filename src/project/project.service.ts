import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './entities/project.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { promisify } = require('util');

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = await this.projectRepository.create(createProjectDto);
    const res = await promisify(fs.writeFile)(
      `./files/${project.title}.json`,
      JSON.stringify(project),
    );
    return { project, res };
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
    const deletedProject = this.projectRepository.destroy({ where: { id } });
    return deletedProject;
  }
}
