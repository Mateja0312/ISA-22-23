//user model 

import { Table, Column, Model, HasMany, ForeignKey } from 'sequelize-typescript';
import {Center} from "./Center";
import {Rating} from "./Rating";

@Table
export class User extends Model<User>{
  @Column
  firstName!: string

  @Column
  lastName!: string

  @Column
  email!: string

  @Column
  password!: string

  @Column
  role!: string

  @Column
  active!: string

  @Column
  address!: string

  @Column
  city!: string

  @ForeignKey(() => Center)
  @Column
  employedAt!: number

  @HasMany(() => Rating)
  @Column
  ratings: Rating[];

}