import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './entities/project.entity';
import {
  createProjectTemplateById,
  deleteModel,
  deleteProjectById,
  getModels,
  updateModels,
} from '../helper/project-template-helper';
import { ProjectDBService } from './project.db.service';

@Injectable()
export class ProjectService {
  async getTable(id: number) {
    const projectDBService = new ProjectDBService(id);
    const res = await projectDBService.getAllDataFromTables();
    console.log(res);
  }
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
  ) { }

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

  async getDBModels(id: number) {
    return await getModels(id);
  }

  async getDbTables(id: number) {
    const db = new ProjectDBService(id);
    return await db.getAlltables();
  }

  async getDbTable(id: number, tableName: string) {
    const db = new ProjectDBService(id);
    try {
      const table = await db.getDataTable(tableName);
      return table;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async updateDBModels(id: number, updateModelDto) {
    const result = await updateModels(id, updateModelDto);
    return result;
  }

  async deleteDBModels(id: number, modelName: string) {
    const result = await deleteModel(id, modelName);
    return result;
  }

  async getTables(projectId: number) {
    const db = await new ProjectDBService(projectId);
    const result = await db.getAlltables();
    return result;
  }
}
