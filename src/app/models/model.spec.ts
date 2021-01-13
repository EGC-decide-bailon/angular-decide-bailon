import { QuestionOption } from './questionOptions.model';
import { Question } from './question.model';
import { Voting } from './voting.model';

describe('Model creation', () => {

    const option1 = new QuestionOption(1, 'option test 1', false);
    const option2 = new QuestionOption(2, 'option test 2', false);
    const question = new Question('description test', [option1, option2]);
    const voting = new Voting(1, 'name test', 'description test', question, new Date('20-10-2019'), new Date('30-12-2019'), []);

    it('should create an instance of Option', () => {
        expect(option1).toBeTruthy();
    });

    it('should create an instance of Option', () => {
        expect(option2).toBeTruthy();
    });

    it('should create an instance of Question', () => {
        expect(question).toBeTruthy();
    });

    it('should create an instance of Voting', () => {
        expect(voting).toBeTruthy();
    });
});
