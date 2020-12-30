import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';
import { File } from './File';

export class Product extends Model {
  public id!: number;
  public name!: string;
  public unit!: number;
  public cost!: number;
  public value!: number;
  public provider_value!: number;
  public minvalue!: number;
  public stock!: number;
  public width!: number;
  public height!: number;
  public ncm!: number;
  public info!: Text;
  public star!: boolean;
  public menu!: string;
  public active!: number;
  public minsize!: number;
  public deadline!: number;
  public photo!: string;
  public finishing!: string;
}

export interface IProduct {
  name: string;
  unit: number;
  cost: number;
  value: number;
  provider_value: number;
  minvalue: number;
  stock: number;
  width?: number;
  height?: number;
  ncm: number;
  info: Text;
  star?: boolean;
  menu?: string;
  active?: number;
  minsize?: number;
  deadline?: number;
  photo?: string;
  finishing?: string;
}

Product.init(
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
    unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    provider_value:{
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    minvalue: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    minsize: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: -1,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    width: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    height: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    ncm: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    star: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    menu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    deadline: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    finishing: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: database,
    tableName: "products",
  }
);

Product.belongsTo(File, { foreignKey: 'template' });

Product.sync().then(() => console.log("Product table started"));
