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
  public status!: string;
  public provider!: number;
  public reset_pass!: string | null;
  public reset_expires!: Date | null;
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
  status: string;
  address_id?: number;
  provider?: number;
  reset_pass?: string;
  reset_expires?: Date;
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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provider: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    reset_pass: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reset_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
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
