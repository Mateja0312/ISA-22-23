'use strict';

import { Table, Column, Model, BelongsTo } from 'sequelize-typescript';
import { Center } from './Center';
import {User} from "./User";
import {Rating} from "./Rating";

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

    @BelongsTo(() => Center, 'center_id')
    center: Center;
  }
  