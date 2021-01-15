import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Voting } from '../models/voting.model';
import {AppComponent} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  private headers = new HttpHeaders({'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'});

  constructor(private http: HttpClient) { }

  parseVoting(voting: any): Voting {
      return voting;
  }

  getVoting(id: number): Observable<object> {
    return this.http.get(`${environment.apiUrl}gateway/voting/?id=` + id);
  }

  postData(data: { vote: { a: any; b: any; }; voting: number; voter: number; token: string; }): Observable<object> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json').set('Authorization', 'Token ' + data.token);
    return this.http.post(`${environment.apiUrl}store/`, data, { headers });
  }
}
