import { Question } from './question.model';

export class Voting {
    constructor(
      public id: number,
      public name: string,
      public desc: string,
      public question: Question,
      public startDate: Date,
      public endDate: Date,
      public pubKey: []) {}
    
}