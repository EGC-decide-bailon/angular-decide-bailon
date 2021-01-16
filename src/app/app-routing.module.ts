import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotingsComponent } from './votings/votings.component';
import { VotingComponent } from './votings/voting/voting.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';
import {IndexComponent} from './index/index.component';


const routes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'votings/:id', component: VotingComponent},
  { path: 'votings', component: VotingsComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
