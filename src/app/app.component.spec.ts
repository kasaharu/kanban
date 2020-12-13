import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppInitializer } from './shared/app-shell/applications/app-initialize.usecase';
import { AppShellQuery } from './shared/app-shell/applications/app-shell.query';

class MockAppShellQuery implements Partial<AppShellQuery> {}

class MockAppInitializeUsecase implements Partial<AppInitializer> {}

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [AppComponent],
        providers: [
          { provide: AppShellQuery, useClass: MockAppShellQuery },
          { provide: AppInitializer, useClass: MockAppInitializeUsecase },
        ],
      }).compileComponents();
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'kanban'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('kanban');
  });
});
