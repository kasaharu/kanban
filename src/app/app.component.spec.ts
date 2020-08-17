import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppInitializeUsecase } from './features/app-shell/applications/app-initialize.usecase';
import { AppShellQuery } from './features/app-shell/applications/app-shell.query';

class MockAppShellQuery implements Partial<AppShellQuery> {}

class MockAppInitializeUsecase implements Partial<AppInitializeUsecase> {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: AppShellQuery, useClass: MockAppShellQuery },
        { provide: AppInitializeUsecase, useClass: MockAppInitializeUsecase },
      ],
    }).compileComponents();
  }));

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
