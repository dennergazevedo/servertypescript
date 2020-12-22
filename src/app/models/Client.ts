import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';
import bcrypt from 'bcryptjs';
import { Address } from './Address';
import { File } from './File';

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
  public password!: string;
  public type!: number;
  public status!: string;
  public token!: string;
  public provider!: number;
  public readonly createdAt!: Date;
}

export interface IClient {
  name: string;
  contact?: string;
  phone: string;
  document: string;
  fantasyname?: string;
  stateregistration?: string;
  cityregistration?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
  type: number;
  status: string;
  token: string;
  address_id?: number;
  provider?: number;
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 123456789,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provider: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize: database,
    tableName: "clients",
  }
);

Client.beforeCreate<Client>(async (client: Client, options: any) =>{
  const hash = await bcrypt.hash(client.password, 10);
  client.password = hash;
});

Client.belongsTo(Address, { foreignKey: 'address_id' });
Client.belongsTo(File, { foreignKey: 'file_id' });

export async function checkPassword(password: string, dbHash: string){
  const resp = await bcrypt.compare(password, dbHash);
  return resp;
}

Client.sync().then(() => console.log("Client table started"));
