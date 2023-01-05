import { Table, Column, Model, HasMany, ForeignKey } from 'sequelize-typescript';
import {User} from "./User";
import {Center} from "./Center";

@Table
export class Rating extends Model<Rating>{
  @Column
  rating!: number

  @ForeignKey(() => User)
  @Column
  user_id!: number

  @ForeignKey(() => Center)
  @Column
  center_id!: number
}
