import { DataTypes, Model } from 'sequelize';
import database from '../../database';

class Client extends Model {
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
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    contact: DataTypes.STRING,
    phone: DataTypes.STRING,
    document: DataTypes.STRING,
    fantasyname: DataTypes.STRING,
    stateregistration: DataTypes.STRING,
    cityregistration: DataTypes.STRING,
    email: DataTypes.STRING,
    type: DataTypes.NUMBER,
    status: DataTypes.STRING,
  },
  {
    sequelize: database.connection,
    freezeTableName: true,
  }
);

export default Client;