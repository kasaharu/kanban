import { Injectable } from '@angular/core';
import { AppInitializerService } from '../../../app-initializer.service';

@Injectable({
  providedIn: 'root',
})
export class HomeUsecase {
  constructor(private appInitializer: AppInitializerService) {}

  user$ = this.appInitializer.loggedInUser$;

  async login() {
    try {
      this.appInitializer.login();
    } catch (error) {
      console.error(error);
    }
  }
}
