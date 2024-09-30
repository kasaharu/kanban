import { signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppInitializer } from '../../../../app-initializer';
import { routes } from '../../../../app.routes';
import { User } from '../../../../domain/user/user';
import { userFactory } from '../../../../testing/factories';
import { HomeComponent } from './home.component';

const appInitializer = {
  loggedInUser: signal<User>(userFactory({})),
  readyApp: signal(true),
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter(routes), { provide: AppInitializer, useValue: appInitializer }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
