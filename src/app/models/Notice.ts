import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';
import { Collaborator } from './Collaborator';

export class Notice extends Model {
  public id!: number;
  public describe!: string;
  public date!: Date;
  public active!: number;
}

export interface INotice {
  describe: string;
  date?: Date;
  active: number;
}

Notice.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    describe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize: database,
    tableName: "notices",
  }
);

Notice.belongsTo(Collaborator, { foreignKey: 'collab_id' });

Notice.sync().then(() => console.log("Notice table started"));
