import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeUsecase } from '../../applications/home.usecase';
import { HomeComponent } from './home.component';

class MockHomeUsecase implements Partial<HomeUsecase> {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: HomeUsecase, useClass: MockHomeUsecase }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
