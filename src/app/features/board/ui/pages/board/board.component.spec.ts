import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionUsecase } from '../../applications/section.usecase';
import { BoardComponent } from './board.component';

class MockSectionUsecase implements Partial<SectionUsecase> {
  async fetchSections() {}
}

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent],
      providers: [{ provide: SectionUsecase, useClass: MockSectionUsecase }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
