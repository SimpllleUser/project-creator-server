import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface ProjectCreationAttrs {
  title: string;
  description: string;
}

@Table({ tableName: 'project' })
export class Project extends Model<Project, ProjectCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
}
