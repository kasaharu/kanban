import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';
import BoardPageComponent from './features/board/board-page.component';
import HomePageComponent from './features/home/home-page.component';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['home']);

const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'board', component: BoardPageComponent, ...canActivate(redirectUnauthorizedToHome) },
];

export default ROUTES;
