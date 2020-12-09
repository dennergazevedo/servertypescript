import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';
import { Collaborator } from './Collaborator';
import { ServiceOrder } from './ServiceOrder';

export class Loss extends Model {
  public id!: number;
  public reason!: string;
  public value!: number;
}

export interface ILoss {
  reason: string;
  value: number;
}

Loss.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize: database,
    tableName: "losses",
  }
);

Loss.belongsTo(Collaborator, { foreignKey: 'collab_id' });
Loss.belongsTo(ServiceOrder, { foreignKey: 'serviceorder_id' });

Loss.sync().then(() => console.log("Loss table started"));
