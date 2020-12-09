import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';

export class Address extends Model {
  public id!: number;
  public zipcode!: string;
  public state!: string;
  public city!: string;
  public neighborhood!: string;
  public street!: string;
  public number!: number;
}

export interface IAddress {
  zipcode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize: database,
    tableName: "addresses",
  }
);

Address.sync().then(() => console.log("Address table started"));
