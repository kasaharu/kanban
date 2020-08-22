import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionQuery } from '../../../applications/section.query';
import { SectionUsecase } from '../../../applications/section.usecase';
import { SectionsComponent } from './sections.component';

class MockBoardQuery implements Partial<SectionQuery> {}

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
        { provide: SectionQuery, useClass: MockBoardQuery },
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
