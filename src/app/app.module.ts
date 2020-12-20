import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BoardModule } from './features/board/board.module';
import { HomeModule } from './features/home/home.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverlayModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    CoreModule,
    SharedModule,
    HomeModule,
    BoardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
