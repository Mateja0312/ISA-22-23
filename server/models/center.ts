'use strict';
import {
  Model
} from 'sequelize';

interface CenterAttributes {
  id: number;
  name: string;
  address: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Center extends Model<CenterAttributes>
  implements CenterAttributes {
    id!: number;
    name!: string;
    address!: string;

    static associate(models: any) {
      Center.hasMany(models.User, {
        foreignKey: 'employedAt'
      })
    }
  }
  Center.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    address: {
      type: DataTypes.STRING,
      unique: true
    },
  }, {
    sequelize,
    modelName: 'Center',
  });
  return Center;
};