import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';
import { Collaborator } from './Collaborator';
import { ServiceOrder } from './ServiceOrder';

export class Markboard extends Model {
  public id!: number;
  public name!: string;
  public key!: string;
  public startdate!: Date;
  public enddate!: Date;
  public active!: number;
}

export interface IMarkboard {
  name: string;
  key: string;
  startdate?: Date;
  enddate?: Date;
  active: number;
}

Markboard.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    enddate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize: database,
    tableName: "markboards",
  }
);

Markboard.belongsTo(Collaborator, { foreignKey: 'collab_id' });
Markboard.belongsTo(ServiceOrder, { foreignKey: 'serviceorder_id' });

Markboard.sync().then(() => console.log("Markboard table started"));
