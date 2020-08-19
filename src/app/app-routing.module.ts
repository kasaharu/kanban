import { NgModule } from '@angular/core';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './features/board/ui/pages/board/board.component';
import { HomeComponent } from './features/home/ui/pages/home/home.component';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['home']);

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'board', component: BoardComponent, ...canActivate(redirectUnauthorizedToHome) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
