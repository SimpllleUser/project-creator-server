interface TablePrams {
  freezeTableName: boolean;
  paranoid: boolean;
  tableName: string;
  timestamps: boolean;
  underscored: boolean;
}

interface ModelField {
  allowNull: boolean;
  autoIncrement: boolean;
  primaryKey: boolean;
  type: string;
}

export interface ModelParmas {
  fields: ModelField[];
  name: string;
  ['table-prams']: TablePrams;
}

export class UpdateProjectModelDto {
  prevName: string;
  body: ModelParmas;
}

export type CreateProjectModelDto = ModelParmas;
export interface UpdateTableRow {
  [key: string | number]: boolean | string | number;
}
