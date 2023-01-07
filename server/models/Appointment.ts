'use strict';

import { Table, Column, Model, BelongsTo } from 'sequelize-typescript';
import {User} from "./User";

export enum AppointmentStatus {
  AVAILABLE = 'available',
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}
  @Table
  export class Appointment extends Model<Appointment>{

    @Column
    startTime: Date;

    @Column
    durationInMinutes: number;

    @Column
    status: AppointmentStatus;

    @BelongsTo(() => User, 'employee_id')
    employee: User;

    @BelongsTo(() => User, 'client_id')
    client: User;
  }
  