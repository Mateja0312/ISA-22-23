'use strict';

import { Table, Column, Model, HasMany, ForeignKey } from 'sequelize-typescript';
import {User} from "./User";
import {Rating} from "./Rating";

  export class Center extends Model<Center>{
  
    // get averageRating() {
    //   return this.getRatings()
    //     .then((ratings: any) => {
    //       const sum = ratings.reduce((acc: any, rating: any) => acc + rating.rating, 0);
    //       return sum / ratings.length;
    //     });
    // }
    
    // static associate(models: any) {
    //   Center.hasMany(models.User, {
    //     foreignKey: 'employedAt'
    //   })
    // }
  
    @Column
    name!: string

    @Column
    address!: string

    @HasMany(() => User)
    employees: User[];

    @HasMany(() => Rating)
    ratings: Rating[];
};