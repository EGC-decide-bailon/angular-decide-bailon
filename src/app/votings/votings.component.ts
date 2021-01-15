import { Component, OnInit } from '@angular/core';
import { Voting } from '../models/voting.model';
import {QuestionOption} from '../models/questionOptions.model';
import {AuthenticationService} from '../services/authentication.service';
import {VotingService} from '../services/voting.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Question } from '../models/question.model';
import {AbstractControl, NgForm} from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-votings',
  templateUrl: './votings.component.html',
  styleUrls: ['./votings.component.css']
})

export class VotingsComponent implements OnInit {
  singup: boolean;
  voting: Voting;
  options: QuestionOption[] ;
  loading: boolean;
  isSubmitted = false;
  si: number;
  no: number;

  constructor(public fb: FormBuilder, private route: ActivatedRoute, private router: Router, private votingService: VotingService,
              private authService: AuthenticationService) { }

  votingForm = this.fb.group({
    option: ['', [Validators.required]]
  });

  get myForm(): AbstractControl {
    return this.votingForm.get('option');
  }

  get votingName(){ return (this.voting && this.voting.name) ? this.voting.name : null }

  get votingId(){ return (this.voting && this.voting.id) ? this.voting.id : null}

  get votingQuestionDesc() { return (this.voting && this.voting.question.desc) ? this.voting.question.desc : null}

  submitForm(form: NgForm): boolean {
    this.isSubmitted = true;
    if (!form.valid) {
      return false;
    } else {
    alert(JSON.stringify(form.value));
    }
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.votingService.getVoting(this.votingId).subscribe((res) => {
      this.voting = this.votingService.parseVoting(res);
    }, error => {
      console.log(error);
    });
}

onSubmitVote(event: Event): void {

  event.preventDefault();

  this.isSubmitted = true;
  this.loading = true;

  if (this.myForm.value === 1){
    this.si = 1;
    this.no = 0;
  }else{
    this.si = 0;
    this.no = 1;
  }

  const tokenid = this.authService.getToken();
  this.authService.getUser(tokenid).subscribe((res) => {
    const id = (res as any).id;

    const data = {
      vote: { a: this.si , b: this.no },
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


