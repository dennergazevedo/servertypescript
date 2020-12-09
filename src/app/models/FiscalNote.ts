import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';
import { ServiceOrder } from './ServiceOrder';

export class FiscalNote extends Model {
  public id!: number;
  public uuid!: string;
  public discount!: number;
  public presence!: number;
  public freightmodality!: number;
  public freightvalue!: number;
  public payment!: number;
  public paymentform!: number;
  public danfe!: Text;
  public xml!: Text;
  public numbernfe!: number;
  public key!: string;
}

export interface IFiscalNote {
  uuid: string;
  discount: number;
  presence: number;
  freightmodality: number;
  freightvalue: number;
  payment: number;
  paymentform: number;
  danfe?: Text;
  xml?: Text;
  numbernfe?: number;
  key?: string;
}

FiscalNote.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    presence: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    freightmodality: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    freightvalue: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    payment: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paymentform: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    danfe: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    xml: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    numbernfe: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    key: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize: database,
    tableName: "fiscalnote",
  }
);

FiscalNote.belongsTo(ServiceOrder, { foreignKey: 'serviceorder_id' });

FiscalNote.sync().then(() => console.log("FiscalNote table started"));
