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
    // getRatings: () => Promise<[]>

    // Rating = sequelize.import('./rating.ts')
    get averageRating() {
      return this.getRatings()
        .then((ratings: any) => {
          const sum = ratings.reduce((acc: any, rating: any) => acc + rating.rating, 0);
          return sum / ratings.length;
        });
    }
    
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