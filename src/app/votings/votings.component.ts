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
  options: QuestionOption[] ;
  submitted: boolean;
  loading: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private votingService: VotingService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.singup = true;
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

onSubmitVote(datos: string, event: Event): void {
  if (datos === undefined) {
    console.log('Selecciona una opción');
    return;
  }

  event.preventDefault();
  this.submitted = true;
  this.loading = true;
  const v = datos;
  const tokenid = this.authService.getToken();
  this.authService.getUser(tokenid).subscribe((res) => {
    const id = (res as any).id;

    const data = {
      vote: { a: datos , b: datos },
      voting: this.voting.id,
      voter: id,
      token: tokenid
    };
    const e = this.votingService.postData(data).subscribe((ser) => {
      this.router.navigate(['']);
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }, (error) => {
    console.log(error);
    this.loading = false;
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


