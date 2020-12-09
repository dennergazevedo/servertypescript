import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';
import { ServiceOrder } from './ServiceOrder';

export class Invoice extends Model {
  public id!: number;
  public value!: number;
  public paid!: number;
  public missingpay!: number;
  public nfe!: string;
  public note!: string;
  public active!: number;
}

export interface IInvoice {
  value: number;
  paid: number;
  missingpay: number;
  nfe?: string;
  note?: string;
  active: number;
}

Invoice.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    paid: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    missingpay: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    nfe: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  },
  {
    sequelize: database,
    tableName: "invoice",
  }
);

Invoice.belongsTo(ServiceOrder, { foreignKey: 'serviceorder_id' });

Invoice.sync().then(() => console.log("Invoice table started"));
