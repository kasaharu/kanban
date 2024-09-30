import { Injectable, computed, inject } from '@angular/core';
import { AppInitializer } from '../../../../app-initializer';

@Injectable()
export class HomeUsecase {
  readonly #appInitializer = inject(AppInitializer);

  $user = computed(() => this.#appInitializer.loggedInUser());

  async login() {
    try {
      this.#appInitializer.login();
    } catch (error) {
      console.error(error);
    }
  }
}
