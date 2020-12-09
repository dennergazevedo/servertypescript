import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';
import { File } from './File';

export class Product extends Model {
  public id!: number;
  public name!: string;
  public unit!: number;
  public cost!: number;
  public value!: number;
  public minvalue!: number;
  public estoque!: number;
  public width!: number;
  public height!: number;
  public ncm!: number;
  public info!: Text;
}

export interface IProduct {
  name: string;
  unit: number;
  cost: number;
  value: number;
  minvalue: number;
  estoque: number;
  width?: number;
  height?: number;
  ncm: number;
  info: Text;
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
    }
  },
  {
    sequelize: database,
    tableName: "products",
  }
);

Product.belongsTo(File, { foreignKey: 'photo' });
Product.belongsTo(File, { foreignKey: 'template' });

Product.sync().then(() => console.log("Product table started"));
