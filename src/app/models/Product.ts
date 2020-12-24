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
  public estoque!: number;
  public width!: number;
  public height!: number;
  public ncm!: number;
  public info!: Text;
  public star!: boolean;
  public menu!: string;
  public active!: number;
}

export interface IProduct {
  name: string;
  unit: number;
  cost: number;
  value: number;
  provider_value: number;
  minvalue: number;
  estoque: number;
  width?: number;
  height?: number;
  ncm: number;
  info: Text;
  star?: boolean;
  menu?: string;
  active?: number;
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
    estoque: {
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
  },
  {
    sequelize: database,
    tableName: "products",
  }
);

Product.belongsTo(File, { foreignKey: 'photo' });
Product.belongsTo(File, { foreignKey: 'template' });

Product.sync().then(() => console.log("Product table started"));
