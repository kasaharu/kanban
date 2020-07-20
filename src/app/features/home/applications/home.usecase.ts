import { Injectable } from '@angular/core';
import { Authenticator } from '../../../infrastructures/adapters/authenticator';

@Injectable({
  providedIn: 'root',
})
export class HomeUsecase {
  constructor(private authenticator: Authenticator) {}

  user$ = this.authenticator.loggedInUser$;

  async login() {
    try {
      await this.authenticator.login();
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    await this.authenticator.logout();
  }
}
