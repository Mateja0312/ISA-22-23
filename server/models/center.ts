'use strict';
import {
  Model
} from 'sequelize';

interface CenterAttributes {
  id: number;
  name: string;
  address: string;
  rating: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Center extends Model<CenterAttributes>
  implements CenterAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!: string;
    address!: string;
    rating: number;

    static associate(models: any) {
      // define association here
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
    rating: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Center',
  });
  return Center;
};