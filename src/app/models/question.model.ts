import {QuestionOption} from './questionOptions.model';

export class Question {
    constructor(
      public desc: string,
      public options: QuestionOption[]
     ) {}
}
