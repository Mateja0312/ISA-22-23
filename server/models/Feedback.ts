'use strict';

import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { Center } from './Center';
import { User } from "./User";

export enum FeedbackStatus {
  REVIEWED = 'reviewed',
  PENDING = 'pending',
}
  @Table
  export class Feedback extends Model<Feedback>{

    @Column
    content: string;

    @Column
    status: FeedbackStatus;

    @BelongsTo(() => User, 'client_id')
    client: User;

    @BelongsTo(() => User, 'employee_id')
    employee: User;

    @BelongsTo(() => Center, 'center_id')
    center: Center;
  }