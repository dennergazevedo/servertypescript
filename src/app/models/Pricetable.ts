import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';
import { Product } from './Product';

export class Pricetable extends Model {
  public id!: number;
  public up!: number;
  public value!: number;
  public provider_value!: number;
}

export interface IPricetable {
  up: number;
  value: number;
  provider_value: number;
}

Pricetable.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    up: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    provider_value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    }
  },
  {
    sequelize: database,
    tableName: "pricetable",
  }
);

Pricetable.belongsTo(Product, { foreignKey: 'product_id' });

Pricetable.sync().then(() => console.log("Pricetable table started"));
