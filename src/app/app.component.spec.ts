import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppInitializer } from './app-initializer';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

class MockAppInitializer implements Partial<AppInitializer> {}

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes), { provide: AppInitializer, useClass: MockAppInitializer }],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
