'use strict';

import { Table, Column, Model, HasMany, ForeignKey } from 'sequelize-typescript';
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

    @HasMany(() => Rating)
    ratings: Rating[];

    @HasMany(() => Feedback)
    feedbackReceived: Rating[];
};