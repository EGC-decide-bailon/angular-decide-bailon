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

onSubmit(datos: string, event: Event): void {
  if (datos === undefined) {
    console.log('Selecciona una opción');
    return;
  }

  event.preventDefault();
  const v = datos;
  const tokenid = this.authService.getToken();
  this.authService.getUser(tokenid).subscribe((res) => {
    const id = (res as any).id;

    const data = {
      vote: { a: v, b: v },
      voting: this.voting.id,
      voter: id,
      token: tokenid
    };
    const e = this.votingService.postData(data).subscribe((ser) => {
      this.router.navigate(['']);
    }, (error) => {
      console.log(error);
    });
  }, (error) => {
    console.log(error);
  });
}

}


