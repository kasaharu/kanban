import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgWorkboxComponentsModule } from '@kasaharu/ng-workbox/components';
import { AppShellQuery } from '../../applications/app-shell.query';
import { HeaderUsecase } from '../../applications/header.usecase';
import { HeaderComponent } from './header.component';

class MockAppShellQuery {}
class MockHeaderUsecase {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HeaderComponent],
        imports: [RouterTestingModule, NgWorkboxComponentsModule],
        providers: [
          { provide: AppShellQuery, useClass: MockAppShellQuery },
          { provide: HeaderUsecase, useClass: MockHeaderUsecase },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
