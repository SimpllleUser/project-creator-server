import {
  copySourceDirectoryToDirectory,
  removeDirectory,
} from './storage-helper';
const projectConfigPath = './files/project-config';
const projectsPath = './files/projects';

export const createProjectTemplateByName = async (name) => {
  return await copySourceDirectoryToDirectory(
    projectConfigPath,
    `${projectsPath}/${name}`,
  );
};
export const deleteProjectById = async (id) => {
  return await removeDirectory(`${projectsPath}/${id}`);
};
