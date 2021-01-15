import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Question, Voting } from '../models/voting.model';
import {AppComponent} from '../app.component';
import { TypedJSON } from 'typedjson';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  private headers = new HttpHeaders({'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'});

  constructor(private http: HttpClient) { }

  parseVoting(voting: any): Voting {
    return TypedJSON.parse(voting, Voting);
  }

  getVoting(id: number): Observable<object> {
    return this.http.get(`${environment.apiUrl}gateway/voting/?id=` + id);
  }


  getVotings():  Observable<object> {
    return this.http.get(`${environment.apiUrl}gateway/voting/`);
  }

  parseVotings(votings: any): Voting[] {
    const res: Voting[] = [];
    votings.forEach(v => {   
      res.push(v.parseVoting);
    });
    return res;
  }

  
  postData(data: { vote: { a: any; b: any; }; voting: number; voter: number; token: string; }): Observable<object> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json').set('Authorization', 'Token ' + data.token);
    return this.http.post(`${environment.apiUrl}store/`, data, { headers });
  }
}
