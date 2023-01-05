'use strict';

import { Table, Column, Model, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import {User} from "./User";
import {Rating} from "./Rating";

  @Table
  export class Questionnaire extends Model<Questionnaire>{
  
    @Column
    Q1: boolean;

    @Column
    Q2: boolean;

    @Column
    Q3: boolean;

    @Column
    Q4: boolean;

    @Column
    Q5: boolean;

    @Column
    Q6: boolean;

    @Column
    Q7: boolean;

    @Column
    Q8: boolean;

    @Column
    Q9: boolean;

    @Column
    Q10: boolean;

    @Column
    Q11: boolean;

    @Column
    Q12: boolean;

    @Column
    Q13: boolean;

    @Column
    Q14: boolean;

    @Column
    Q15: boolean;

    @BelongsTo(() => User, 'client_id')
    client: User;
};