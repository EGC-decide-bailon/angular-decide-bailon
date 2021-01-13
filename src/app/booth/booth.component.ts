import { Component, OnInit } from '@angular/core';
import { Voting } from '../models/voting.model';
import {QuestionOption} from '../models/questionOptions.model';
import {AuthenticationService} from '../services/authentication.service';
import {VotingService} from '../services/voting.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-votings',
  templateUrl: './booth.component.html',
  styleUrls: ['./booth.component.css']
})
export class BoothComponent implements OnInit {
  singup: boolean;
  booth: Voting [] =[];
  options:QuestionOption[] ;

  constructor(private route: ActivatedRoute, private router: Router, private votingService: VotingService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.singup = true;
    const id = +this.route.snapshot.params.id;
    console.log('Get voting stars');
    this.votingService.getVoting(id).subscribe((res) => {
      console.log('Resultado' + res);
      this.booth = this.votingService.parseVotings(res[0] as any);
    }, error => {
      console.log(error);
    });
  }

  onSubmit(username: string, password: string, event: Event): void {
    event.preventDefault();

    // stop here if form is invalid
    if (username === '' || password === '') {
      return;
    }

    this.authService.login(username, password).subscribe(
      res => {
        console.log(res);
        if (res.hasOwnProperty('token')) {
          this.authService.setToken((res as any).token);
          this.authService.changeLoggedStatus(true);
          this.singup = true;
        } else {
          this.authService.changeLoggedStatus(false);
        }
      },
      error => {
        this.authService.changeLoggedStatus(false);
      });
  }

}
