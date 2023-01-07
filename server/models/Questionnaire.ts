'use strict';

import { Table, Column, Model, BelongsTo } from 'sequelize-typescript';
import {User} from "./User";

export const questions : Array<string> = [
  "Pitanje 1",
  "Pitanje 2",
  "Pitanje 3",
  "Pitanje 4",
  "Pitanje 5",
  "Pitanje 6",
  "Pitanje 7",
  "Pitanje 8",
  "Pitanje 9",
  "Pitanje 10",
  "Pitanje 11",
  "Pitanje 12",
  "Pitanje 13",
  "Pitanje 14",
  "Pitanje 15",
];

  @Table
  export class Questionnaire extends Model<Questionnaire>{
  
    @Column
    q_answers: string;

    @BelongsTo(() => User, 'client_id')
    client: User;
    
    public get getQAnswers() : string {
      return JSON.parse(this.q_answers);
    }

    public set setQAnswers(qAnswers : Array<string>) {
      
      this.q_answers = JSON.stringify(qAnswers);
    }
};