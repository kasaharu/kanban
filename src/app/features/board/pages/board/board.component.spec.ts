import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { SectionHasTasks } from '../../../../domain/models';
import { BoardPageComponent } from './board.component';
import { BoardUsecase } from './board.usecase';

class MockBoardUsecase implements Partial<BoardUsecase> {
  sectionsHasTasks$ = new BehaviorSubject<SectionHasTasks[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
  fetchBoardItem(): any {}
}

describe('BoardPageComponent', () => {
  let component: BoardPageComponent;
  let fixture: ComponentFixture<BoardPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BoardPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(BoardPageComponent, {
        add: { providers: [{ provide: BoardUsecase, useClass: MockBoardUsecase }] },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
