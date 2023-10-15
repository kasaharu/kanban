import { signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import ROUTES from '../../../../ROUTES';
import { AppInitializer } from '../../../../app-initializer';
import { User } from '../../../../domain/user/user';
import { userFactory } from '../../../../testing/factories';
import { HomeComponent } from './home.component';

// class MockHomeUsecase implements Partial<HomeUsecase> {}
class MockAppInitializer implements Partial<AppInitializer> {
  $loggedInUser = signal<User>(userFactory({}));
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter(ROUTES), { provide: AppInitializer, useClass: MockAppInitializer }],
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
