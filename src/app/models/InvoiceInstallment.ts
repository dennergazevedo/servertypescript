import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';
import { Bank } from './Bank';
import { Invoice } from './Invoice';

export class InvoiceInstallment extends Model {
  public id!: number;
  public value!: number;
  public paid!: number;
  public typepayment!: number;
  public duedate!: Date;
  public accountplan!: number;
  public payday!: Date;
  public describe!: string;
}

export interface IInvoiceInstallment {
  id: number;
  value: number;
  paid?: number;
  typepayment: number;
  duedate?: Date;
  accountplan: number;
  payday?: Date;
  describe: string;
}

InvoiceInstallment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    paid: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0,
    },
    typepayment: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duedate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
    accountplan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payday: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
    describe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "invoiceinstallments",
  }
);

InvoiceInstallment.belongsTo(Invoice, { foreignKey: 'invoice_id' });
InvoiceInstallment.belongsTo(Bank, { foreignKey: 'bank_id' });

InvoiceInstallment.sync().then(() => console.log("InvoiceInstallment table started"));
