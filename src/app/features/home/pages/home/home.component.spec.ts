import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomeUsecase } from '../../applications/home.usecase';
import { HomePageComponent } from './home.component';

class MockHomeUsecase implements Partial<HomeUsecase> {}

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomePageComponent],
        providers: [{ provide: HomeUsecase, useClass: MockHomeUsecase }],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
