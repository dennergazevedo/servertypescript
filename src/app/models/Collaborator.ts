import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';
import bcrypt from 'bcryptjs';
import { Address } from './Address';
import { File } from './File';

export class Collaborator extends Model {
  public id!: number;
  public name!: string;
  public phone!: string;
  public document!: string;
  public email!: string;
  public password!: string;
  public active!: number;
  public emergency!: string;
  public permission!: number;
  public token!: string;
  public readonly createdAt!: Date;
}

export interface ICollaborator {
  name: string;
  phone: string;
  document: string;
  email: string;
  password: string;
  active: number;
  emergency: string;
  permission: number;
  token?: string;
}

Collaborator.init(
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
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    document: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    permission: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    emergency:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize: database,
    tableName: "collaborators",
  }
);

Collaborator.beforeCreate<Collaborator>(async (collab: Collaborator, options: any) =>{
  const hash = await bcrypt.hash(collab.password, 10);
  collab.password = hash;
});

Collaborator.belongsTo(Address, { foreignKey: 'address_id' });
Collaborator.belongsTo(File, { foreignKey: 'file_id' });

export async function checkPassword(password: string, dbHash: string){
  const resp = await bcrypt.compare(password, dbHash);
  return resp;
}

Collaborator.sync().then(() => console.log("Collaborator table started"));
