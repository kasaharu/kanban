import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { AlertDialogService } from 'src/app/shared/alert-dialog/services/alert-dialog.service';
import { SectionQuery } from '../../../applications/section.query';
import { SectionUsecase } from '../../../applications/section.usecase';
import { SectionsComponent } from './sections.component';

class MockBoardQuery {
  errorMessage$ = new BehaviorSubject<string>('');
}

class MockSectionUsecase implements Partial<SectionUsecase> {
  async fetchSections() {}
  closeAlertDialog() {}
}

class MockAlertDialogService {
  show() {}
}

describe('SectionsComponent', () => {
  let component: SectionsComponent;
  let fixture: ComponentFixture<SectionsComponent>;
  let alertDialogService: AlertDialogService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectionsComponent],
      providers: [
        { provide: SectionQuery, useClass: MockBoardQuery },
        { provide: SectionUsecase, useClass: MockSectionUsecase },
        { provide: AlertDialogService, useClass: MockAlertDialogService },
      ],
    }).compileComponents();

    alertDialogService = TestBed.inject(AlertDialogService);
  }));

  beforeEach(() => {
    spyOn(alertDialogService, 'show').and.returnValue(of(true));
    fixture = TestBed.createComponent(SectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
