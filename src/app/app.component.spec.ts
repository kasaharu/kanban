import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgWorkboxComponentsModule } from '@kasaharu/ng-workbox/components';
import { AppComponent } from './app.component';
import { AppInitializer } from './core/app-shell/applications/app-initialize.usecase';
import { AppShellQuery } from './core/app-shell/applications/app-shell.query';
import { HeaderComponent } from './core/app-shell/containers/header/header.component';

class MockAppShellQuery implements Partial<AppShellQuery> {}

class MockAppInitializeUsecase implements Partial<AppInitializer> {}

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, NgWorkboxComponentsModule],
        declarations: [AppComponent, HeaderComponent],
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
});
