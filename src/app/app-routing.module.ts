import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotingsComponent } from './votings/votings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';
import {IndexComponent} from './index/index.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: IndexComponent},
  { path: 'votings/:id', component: VotingsComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
