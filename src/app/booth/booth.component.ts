import { Component, OnInit } from '@angular/core';
import { Voting } from '../models/voting.model';
import {QuestionOption} from '../models/questionOptions.model';
import {AuthenticationService} from '../services/authentication.service';
import {VotingService} from '../services/voting.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Question } from '../models/question.model';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-votings',
  templateUrl: './booth.component.html',
  styleUrls: ['./booth.component.css']
})
export class BoothComponent implements OnInit {
  singup: boolean;
  voting: Voting;
  options:QuestionOption[] ;

  constructor(private route: ActivatedRoute, private router: Router, private votingService: VotingService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.voting = new Voting(1,'','',(new Question('',[new QuestionOption(0,'',true),new QuestionOption(1,'',false)])),new Date(),new Date(),[]);
    this.singup = true;
    const tokenid = this.authService.getToken();
    this.authService.getUser(tokenid).subscribe((res) => {
      const id = (res as any).id;
      console.log('se ha hecho la petición');
      this.votingService.getVoting(id).subscribe((res) => {
      console.log('Resultado' + res);
        this.voting = this.votingService.parseVoting(res);
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

  
