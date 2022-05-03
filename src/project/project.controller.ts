import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UpdateProjectModelDto } from './dto/project-model.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  // @Get(':id/source')
  // findSource(@Param('id') id: string) {
  //   return this.projectService.getModels(+id);
  // }

  @Get(':id/source/table')
  getSourceTable(@Param('id') id: string) {
    return this.projectService.getTable(+id);
  }

  @Get(':id/db/models')
  getDbModels(@Param('id') id: string) {
    return this.projectService.getDBModels(+id);
  }
  @Patch(':id/db/models/')
  patchDbModels(
    @Param('id') id: string,
    @Body() updateModelDto: UpdateProjectModelDto,
  ) {
    return this.projectService.updateDBModels(+id, updateModelDto);
  }

  @Delete(':id/db/models/:modelName')
  deleteModel(@Param('id') id: string, @Param('modelName') modelName: string) {
    return this.projectService.deleteDBModels(+id, modelName);
  }

  @Get(':id/db/tables')
  getDbTables(@Param('id') id: string) {
    return this.projectService.getDbTables(+id);
  }

  @Get(':id/db/:tableName')
  getDbTableData(
    @Param('id') id: number,
    @Param('tableName') tableName: string,
  ) {
    return this.projectService.getDbTable(+id, tableName);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
