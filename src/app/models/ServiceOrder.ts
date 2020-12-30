import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';
import { Address } from './Address';
import { Client } from './Client';
import { Collaborator } from './Collaborator';

export class ServiceOrder extends Model {
  public id!: number;
  public situation!: string;
  public describe!: string;
  public value!: number;
  public addition!: number;
  public discount!: number;
  public describeaddition!: string;
  public describediscount!: string;
  public deadline!: Date;
  public expedition!: string;
  public art!: number;
  public type!: string;
  public client_id!: number;
}

export interface IServiceOrder {
  situation: string;
  describe: string;
  value: number;
  addition?: number;
  discount?: number;
  describeaddition?: string;
  describediscount?: string;
  deadline?: Date;
  expedition?: string;
  art?: number;
  type?: string;
  client_id?: number;
}

ServiceOrder.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    situation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    describe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    addition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    describeaddition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    describediscount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    expedition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    art: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize: database,
    tableName: "serviceorders",
  }
);

ServiceOrder.belongsTo(Client, { foreignKey: 'client_id' });
ServiceOrder.belongsTo(Address, { foreignKey: 'address_id' });
ServiceOrder.belongsTo(Collaborator, { foreignKey: 'collab_id'});

ServiceOrder.sync().then(() => console.log("ServiceOrder table started"));
