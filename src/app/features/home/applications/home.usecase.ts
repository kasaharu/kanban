import { Injectable, computed } from '@angular/core';
import { AppInitializer } from '../../../app-initializer';

@Injectable({
  providedIn: 'root',
})
export class HomeUsecase {
  constructor(private appInitializer: AppInitializer) {}

  $user = computed(() => this.appInitializer.$loggedInUser());

  async login() {
    try {
      this.appInitializer.login();
    } catch (error) {
      console.error(error);
    }
  }
}
