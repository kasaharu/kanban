import { signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppInitializer } from '../../../../app-initializer';
import { User } from '../../../../domain/user/user';
import { userFactory } from '../../../../testing/factories';
import { HeaderComponent } from './header.component';

const appInitializer = {
  loggedInUser: signal<User>(userFactory({})),
  readyApp: signal(true),
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HeaderComponent],
      providers: [{ provide: AppInitializer, useValue: appInitializer }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
