import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { environment as environment_1 } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserModule, AppRoutingModule, OverlayModule, AngularFireModule.initializeApp(environment.firebase))]
})
  .catch((err) => console.error(err));
