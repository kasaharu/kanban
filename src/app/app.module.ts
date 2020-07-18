import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgWorkboxComponentsModule } from '@kasaharu/ng-workbox/components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './features/home/home.module';
import { HeaderComponent } from './shared/components/header/header.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, NgWorkboxComponentsModule, HomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
