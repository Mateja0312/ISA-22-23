'use strict';
import {
  Model
} from 'sequelize';

interface AppointmentAttrubutes {
  id: number;
  startTime: Date;
  durationInMinutes: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Appointment extends Model<AppointmentAttrubutes>
  implements AppointmentAttrubutes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    startTime: Date;
    durationInMinutes: number;

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
    durationInMinutes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};