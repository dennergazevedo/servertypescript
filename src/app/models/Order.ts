import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';
import { Product } from './Product';
import { ServiceOrder } from './ServiceOrder';

export class Order extends Model {
  public id!: number;
  public quantity!: number;
  public value!: number;
  public width!: number;
  public height!: number;
  public finishing!: string;
  public sector!: string;
  public describe!: string;
  public unitvalue!: number;
}

export interface IOrder {
  quantity: number;
  value: number;
  width?: number;
  height?: number;
  finishing: string;
  sector: string;
  describe: string;
  unitvalue: number;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    width: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    height: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    finishing: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    describe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitvalue: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    }
  },
  {
    sequelize: database,
    tableName: "orders",
  }
);

Order.belongsTo(ServiceOrder, { foreignKey: 'serviceorder_id' });
Order.belongsTo(Product, { foreignKey: 'product_id' });

Order.sync().then(() => console.log("Order table started"));