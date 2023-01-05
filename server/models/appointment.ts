'use strict';
import {
  Model
} from 'sequelize';

interface AppointmentAttributes {
  id: number;
  startTime: Date;
  durationInMinutes: number;
  status: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Appointment extends Model<AppointmentAttributes>
  implements AppointmentAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    startTime: Date;
    durationInMinutes: number;
    status: string;

    static associate(models: any) {
      Appointment.belongsTo(models.User, {
        foreignKey: 'client'
      });
      Appointment.belongsTo(models.User, {
        foreignKey: 'employee'
      });
    }
  }
  Appointment.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    startTime: DataTypes.DATE,
    durationInMinutes: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};