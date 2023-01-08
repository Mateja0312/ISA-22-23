'use strict';

import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import {User} from "./User";
import {Rating} from "./Rating";
import { Feedback } from './Feedback';
  @Table
  export class Center extends Model<Center>{
  
    @Column
    name!: string

    @Column
    address!: string

    @HasMany(() => User)
    employees: User[];

    @HasMany(() => Rating, 'center_id')
    ratings: Rating[];

    @HasMany(() => Feedback)
    feedbackReceived: Rating[];
};