'use strict';
import {
  Model
} from 'sequelize';

interface UserAttributes {
  id: number;
  email: string,
  password: string,
  role: string,
  active: string,
  firstName: string,
  lastName: string,
  JMBG: string,
  gender: boolean,
  address: string,
  city: string,
  country: string,
  phone: string,
  profession: string,
  institution: string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes{
    id!: number;
    email!: string;
    password!: string;
    role!: string;
    active!: string;
    firstName: string;
    lastName: string;
    JMBG: string;
    gender: boolean;
    address: string;
    city: string;
    country: string;
    phone: string;
    profession: string;
    institution: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      User.hasMany(models.Appointment, {
        foreignKey: 'client'
      });
      User.hasMany(models.Appointment, {
        foreignKey: 'employee'
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
            msg:"Email-id required"
        },
        isEmail:{
            msg:'Valid email-id required'
        }
      },
      unique: true
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    active: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    JMBG: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    phone: DataTypes.STRING,
    profession: DataTypes.STRING,
    institution: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};