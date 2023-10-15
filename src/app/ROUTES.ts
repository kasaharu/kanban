import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';
import { BoardPageComponent } from './features/board/pages/board/board.component';
import { HomeComponent } from './features/home/containers/home/home.component';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['home']);

const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'board', component: BoardPageComponent, ...canActivate(redirectUnauthorizedToHome) },
];

export default ROUTES;
