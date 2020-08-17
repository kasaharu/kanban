import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardQuery } from '../../applications/board.query';
import { SectionUsecase } from '../../applications/section.usecase';
import { SectionsComponent } from './sections.component';

class MockBoardQuery implements Partial<BoardQuery> {}

class MockSectionUsecase implements Partial<SectionUsecase> {
  async fetchSections() {}
}

describe('SectionsComponent', () => {
  let component: SectionsComponent;
  let fixture: ComponentFixture<SectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectionsComponent],
      providers: [
        { provide: BoardQuery, useClass: MockBoardQuery },
        { provide: SectionUsecase, useClass: MockSectionUsecase },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
