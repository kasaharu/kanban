import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { NgWorkboxComponentsModule } from '@kasaharu/ng-workbox/components';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppShellModule } from './features/app-shell/app-shell.module';
import { BoardModule } from './features/board/board.module';
import { HomeModule } from './features/home/home.module';
import { AlertDialogComponent } from './shared/alert-dialog/presenters/alert-dialog/alert-dialog.component';
import { HeaderComponent } from './shared/presenters/header/header.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, AlertDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverlayModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    NgWorkboxComponentsModule,
    AppShellModule,
    HomeModule,
    BoardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
