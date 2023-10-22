import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';
import { BoardComponent } from './features/board/pages/board/board.component';
import HomePageComponent from './features/home/home-page.component';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['home']);

const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'board', component: BoardComponent, ...canActivate(redirectUnauthorizedToHome) },
];

export default ROUTES;
