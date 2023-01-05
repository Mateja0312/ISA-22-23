'use strict';
import {
  Model
} from 'sequelize';

interface RatingAttributes {
  id: number;
  rating: number;
  client_id: number;
  center_id: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Rating extends Model<RatingAttributes>
  implements RatingAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    client_id!: number;
    center_id!: number;
    rating!: number;

    static associate(models: any) {
      Rating.belongsTo(models.User, {
        foreignKey: 'client_id'
      });
      Rating.belongsTo(models.Center, {
        foreignKey: 'center_id'
      });
    }
  }
  Rating.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rating: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    center_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};