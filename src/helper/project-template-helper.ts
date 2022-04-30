import {
  copySourceDirectoryToDirectory,
  getSourceFiles,
  removeDirectory,
} from './storage-helper';
const projectConfigPath = './files/project-config';
const projectsPath = './files/projects';

const getModelData = (modelConfig) => modelConfig?.source['source-code'];

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
