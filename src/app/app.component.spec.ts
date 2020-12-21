import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppInitializer } from './core/app-shell/applications/app-initialize.usecase';
import { AppShellQuery } from './core/app-shell/applications/app-shell.query';

class MockAppShellQuery implements Partial<AppShellQuery> {}
class MockAppInitializeUsecase implements Partial<AppInitializer> {}

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [AppComponent],
        providers: [
          { provide: AppShellQuery, useClass: MockAppShellQuery },
          { provide: AppInitializer, useClass: MockAppInitializeUsecase },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
