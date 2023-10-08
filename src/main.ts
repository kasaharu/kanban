import { enableProdMode, importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import ROUTES from './app/ROUTES';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(ROUTES), importProvidersFrom(AngularFireModule.initializeApp(environment.firebase))],
}).catch((err) => console.error(err));
