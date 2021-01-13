
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Voting } from '../models/voting.model';
import {Question} from '../models/question.model';
import { QuestionOption } from "../models/questionOptions.model";

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  //private headers = new HttpHeaders({'Content-Type': 'application/json',
    //'Access-Control-Allow-Origin': '*'});

  constructor(private http: HttpClient) { }

  getVotingsByUserId(id: number): Observable<object> {
    return this.http.get(`${environment.apiUrl}voting/user/?id=${id}`);
  }

  parseVotings(votings: any): Voting[] {
    const res: Voting [] = [];
    votings.forEach(v => {
      const options: QuestionOption[] = [];
      v.question.options.forEach(o => {
        options.push(new QuestionOption(o.desc,o.number, o.option, false));
      });
      const question = new Question(v.question.desc, options);
      res.push(new Voting(v.id, v.name, v.desc, v.question, v.start_date, v.end_date, v.pub_key));
    });
    return res;
  }

  getVoting(id: number): Observable<object> {
    return this.http.get(`${environment.apiUrl}voting/?id=${id}`);
  }

  postData(data: { vote: { a: any; b: any; }; voting: number; voter: number; token: string; }): Observable<object> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json').set('Authorization', 'Token ' + data.token);
    return this.http.post(`${environment.apiUrl}store/`, data, { headers });
  }
}
