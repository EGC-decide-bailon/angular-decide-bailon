import { Component, OnInit , Input } from '@angular/core';
import { Voting } from 'src/app/models/voting.model';
@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {
  @Input() voting: Voting;
  constructor() { }

  ngOnInit(): void {
    (this.voting.startDate as any) = new Date(this.voting.startDate).toLocaleString();
  }

}
