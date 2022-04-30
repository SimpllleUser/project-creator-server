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
