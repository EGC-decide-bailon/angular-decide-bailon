import { Component, OnInit } from '@angular/core';
import { Voting } from '../models/voting.model';
import {QuestionOption} from '../models/questionOptions.model';
import {AuthenticationService} from '../services/authentication.service';
import {VotingService} from '../services/voting.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-votings',
  templateUrl: './votings.component.html',
  styleUrls: ['./votings.component.css']
})

export class VotingsComponent implements OnInit {
  singup: boolean;
  voting: Voting;
  logged: boolean;
  options: QuestionOption[] ;

  constructor(private route: ActivatedRoute, private router: Router, private votingService: VotingService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.logged = true;
    this.voting = new Voting(1, '', '', (new Question('',
      [new QuestionOption(0, '', true),
        new QuestionOption(1, '', false)])), new Date(), new Date(), []);
    this.singup = true;
    const tokenId = this.authService.getToken();
    this.authService.getUser(tokenId).subscribe((res) => {
      const id = (res as any).id;
      console.log('se ha hecho la petición');
      this.votingService.getVoting(id).subscribe((res2) => {
        console.log('Resultado' + res);
        this.voting = this.votingService.parseVoting(res2);
        }, error => {
          console.log(error);
      });
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
        } else {
          this.authService.changeLoggedStatus(false);
        }
      },
      error => {
        this.authService.changeLoggedStatus(false);
      });
  }

}


