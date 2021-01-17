import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged: boolean;
  shown: boolean;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.auth.statusChanged.subscribe(r => {
      this.logged = r;
    });
  }

  onLogout(event: Event): void {
    event.preventDefault();
    this.auth.logout().subscribe(res => {
      this.auth.removeToken();
      this.auth.changeLoggedStatus(false);
      this.router.navigate(['']);
      this.shown = false;
    }, error => {
      console.log(error);
    });
  }
}
