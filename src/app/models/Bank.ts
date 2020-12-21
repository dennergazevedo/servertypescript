import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';

export class Bank extends Model {
  public id!: number;
  public name!: string;
  public value!: number;
}

export interface IBank {
  id: number;
  name: string;
  value: number;
}

Bank.init(
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
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize: database,
    tableName: "banks",
  }
);

Bank.sync().then(() => console.log("Banks table started"));
