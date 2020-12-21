import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';

export class Taxation extends Model {
  public id!: number;
  public name!: string;
  public value!: number;
}

export interface ITaxation {
  id: number;
  describe: string;
  ref: string;
}

Taxation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    describe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ref: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "taxations",
  }
);

Taxation.sync().then(() => console.log("Taxations table started"));
