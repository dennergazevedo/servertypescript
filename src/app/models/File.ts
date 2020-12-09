import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';
import { ServiceOrder } from './ServiceOrder';

export class File extends Model {
  public id!: number;
  public name!: string;
  public describe!: string;
  public path!: string;
  public url!: string;
  public auth!: number;
  public type!: string;
}

export interface IFile {
  name: string;
  describe?: string;
  path: string;
  url: string;
  auth?: number;
  type: string;
}

File.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    describe: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    auth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize: database,
    tableName: "files",
  }
);

File.sync().then(() => console.log("File table started"));