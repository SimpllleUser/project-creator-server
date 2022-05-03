import { ModelParmas } from 'src/project/dto/project-model.dto';
import {
  copySourceDirectoryToDirectory,
  createFile,
  getSourceFiles,
  removeDirectory,
} from './storage-helper';
const projectConfigPath = './files/project-config';
const projectsPath = './files/projects';

const getModelData = (modelConfig) => modelConfig?.source['source-code'];
const toModelData = (model) => ({ ['source-code']: { model } });

export const createProjectTemplateById = async (name) => {
  return await copySourceDirectoryToDirectory(
    projectConfigPath,
    `${projectsPath}/${name}`,
  );
};
export const deleteProjectById = async (id) => {
  return await removeDirectory(`${projectsPath}/${id}`);
};
export const getModels = async (id: number) => {
  const dbModelsSource = await getSourceFiles(`${projectsPath}/${id}/models`);
  return dbModelsSource.map(getModelData);
};
export const updateModels = async (
  id: number,
  { body }: { body: ModelParmas },
) => {
  try {
    const modelBody = toModelData(body);
    await createFile(
      `${projectsPath}/${id}/models`,
      `${body.name}.json`,
      JSON.stringify(modelBody, null, 4),
    );
    return body;
  } catch (error) {
    console.log(error);
    throw Error;
  }

};
