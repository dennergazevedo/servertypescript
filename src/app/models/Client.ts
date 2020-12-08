import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';

export class Client extends Model {
  public id!: number;
  public name!: string;
  public contact!: string | null;
  public phone!: string;
  public document!: string;
  public fantasyname!: string | null;
  public stateregistration!: string | null;
  public cityregistration!: string | null;
  public email!: string | null;
  public type!: number;
  public status!: string;
  public readonly createdAt!: Date;
}

Client.init(
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
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    document: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fantasyname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stateregistration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cityregistration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize: database,
    tableName: "clients",
  }
);

Client.sync({ force: true }).then(() => console.log("Clients table created"));
