import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  static logged: boolean;
  constructor(private http: HttpClient) { }

  login(username2: string, password2: string): Observable<object> {
    if (username2 !== '' && password2 !== '') {
      const body = {
        username: username2,
        password: password2
      };
      return this.http.post<any>(`${environment.apiUrl}gateway/authentication/login/`, body);
    }
  }

  logout(): Observable<object> {
    return this.http.post(`${environment.apiUrl}authentication/logout/`, {token: this.getToken()});
  }

  getUser(token: string): Observable<object> {
    const data = {token};
    return this.http.post(`${environment.apiUrl}gateway/authentication/getuser/`, data);
  }

  getToken(): string {
    const cookies = document.cookie.split('; ');
    let token = '';
    cookies.forEach((c) => {
      const cs = c.split('=');
      if (cs[0] === 'sessionid' && cs[1]) {
        token = cs[1];
      }
    });
    return token;
  }

  setToken(token: string): void {
    document.cookie = 'sessionid=' + token + ';';
  }

  removeToken(): void {
    document.cookie = 'sessionid=;';
  }

  isLogged(): boolean {
    return AuthenticationService.logged;
  }

  changeLoggedStatus(newStatus: boolean): void {
    AuthenticationService.logged = newStatus;
  }
}
