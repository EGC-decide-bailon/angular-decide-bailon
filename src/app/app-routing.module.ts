import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoothComponent } from './booth/booth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'votings/:id', component: BoothComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
