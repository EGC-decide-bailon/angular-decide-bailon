import { Component, OnInit} from '@angular/core';
import { Voting } from '../models/voting.model';
import {AuthenticationService} from '../services/authentication.service';
import {VotingService} from '../services/voting.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ChangeDetectorRef} from '@angular/core';


@Component({
  selector: 'app-votings',
  templateUrl: './votings.component.html',
  styleUrls: ['./votings.component.css']
})

export class VotingsComponent implements OnInit {
  voting: Voting;
  votings: Voting[] = [];

  constructor( private route: ActivatedRoute, private router: Router, private votingService: VotingService,
               private authService: AuthenticationService, private cd: ChangeDetectorRef) { }

  get votingName(): string {
    return (this.voting && this.voting.name) ? this.voting.name : null;
  }

  get votingId(): number {
    return (this.voting && this.voting.id) ? this.voting.id : null;
  }

  get votingQuestionDesc(): string {
    return (this.voting && this.voting.question.desc) ? this.voting.question.desc : null;
  }


  ngOnInit(): void {
    this.votingService.getVotings().subscribe((res) => {
      for (let r = 0; r in res; r++){
        this.votings.push(this.votingService.parseVoting(res[r]));
      }
      this.cd.detectChanges();
      console.log('loading complete');
    });
    }
  }

