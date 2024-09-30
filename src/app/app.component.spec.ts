import { signal } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppInitializer } from './app-initializer';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { User } from './domain/user/user';
import { userFactory } from './testing/factories';

const appInitializer = {
  loggedInUser: signal<User>(userFactory({})),
  readyApp: signal(true),
};

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes), { provide: AppInitializer, useValue: appInitializer }],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
