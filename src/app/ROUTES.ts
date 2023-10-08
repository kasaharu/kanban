import { canActivate, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { Routes } from '@angular/router';
import { BoardPageComponent } from './features/board/pages/board/board.component';
import { HomePageComponent } from './features/home/pages/home/home.component';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['home']);

const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'board', component: BoardPageComponent, ...canActivate(redirectUnauthorizedToHome) },
];

export default ROUTES;
