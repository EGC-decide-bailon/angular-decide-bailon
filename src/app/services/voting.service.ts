
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
    return this.http.get(`${environment.apiUrl}gateway/voting/user/?id=${id}/`);
  }

  parseVoting(voting: any): Voting {
    
      const options: QuestionOption[] = [];
      voting.question.options.forEach(o => {
        options.push(new QuestionOption(o.num, o.option, false));
      });
      const question = new Question(voting.question.desc, options);
      voting = new Voting(voting.id, voting.name, voting.desc,question, voting.startDate, voting.endDate, voting.pubKey);
    
    return voting;
  }

  getVoting(id: number): Observable<object> {
    return this.http.get(`${environment.apiUrl}gateway/voting/?id=${id}/`);
  }

  postData(data: { vote: { a: any; b: any; }; voting: number; voter: number; token: string; }): Observable<object> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json').set('Authorization', 'Token ' + data.token);
    return this.http.post(`${environment.apiUrl}store/`, data, { headers });
  }
}
