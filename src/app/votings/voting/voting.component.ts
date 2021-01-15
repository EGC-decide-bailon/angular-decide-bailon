import { Component, OnInit } from '@angular/core';
import { Voting } from 'src/app/models/voting.model';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {VotingService} from 'src/app/services/voting.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, NgForm} from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {TypedJSON} from 'typedjson';

@Component({
  selector: 'app-votings',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})

export class VotingComponent implements OnInit {
  logged: boolean;
  singup: boolean;
  voting: Voting;
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

  get votingName(): string {
    return (this.voting && this.voting.name) ? this.voting.name : null;
  }

  get votingId(): number {
    return (this.voting && this.voting.id) ? this.voting.id : null;
  }

  get votingQuestionDesc(): string {
    return (this.voting && this.voting.question.desc) ? this.voting.question.desc : null;
  }

  submitForm(form: NgForm): boolean {
    this.isSubmitted = true;
    if (!form.valid) {
      return false;
    } else {
    alert(JSON.stringify(form.value));
    }
  }

  ngOnInit(): void {
    this.logged = !this.authService.isLogged;
    const id = +this.route.snapshot.params.id - 1;
    this.votingService.getVoting(id).subscribe((res) => {
      console.log(res[id]);
      this.voting = TypedJSON.parse(res[id], Voting);
      console.log(this.voting);
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
  console.log('Token ' + tokenid);
  console.log('obteniendo usuario');
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


