import { DataTypes, Model } from 'sequelize';
import { database } from '../../config/database';
import { File } from './File';

export class Slideshow extends Model {
  public id!: number;
  public describe!: string;
  public redirect!: string;
}

export interface ISlideshow {
  describe: string;
  redirect: string;
  img_id?: number;
}

Slideshow.init(
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
    redirect: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "slideshows",
  }
);

Slideshow.belongsTo(File, { foreignKey: 'img_id' });

Slideshow.sync().then(() => console.log("Slideshow table started"));
