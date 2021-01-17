import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(username: string, password: string, event: Event): void {
    event.preventDefault();
    this.submitted = true;

    if (username === '' || password === '') {
      return;
    }

    this.authService.login(username, password).subscribe(
      res => {
        console.log(res);
        if (res.hasOwnProperty('token')) {
          this.authService.setToken((res as any).token);
          this.authService.changeLoggedStatus(true);
          window.location.reload();
        } else {
          this.authService.changeLoggedStatus(false);
        }
      },
      error => {
        this.authService.changeLoggedStatus(false);
      });
  }
}
