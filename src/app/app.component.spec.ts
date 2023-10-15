import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import ROUTES from './ROUTES';
import { AppInitializerService } from './app-initializer.service';
import { AppComponent } from './app.component';

class MockAppInitializerService implements Partial<AppInitializerService> {}

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(ROUTES), { provide: AppInitializerService, useClass: MockAppInitializerService }],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
