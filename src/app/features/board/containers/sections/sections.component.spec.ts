import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { SectionHasTasks } from '../../../../domain/models';
import { AlertDialogService } from '../../../../shared/alert-dialog/services/alert-dialog.service';
import { SectionQuery } from '../../applications/section.query';
import { SectionUsecase } from '../../applications/section.usecase';
import { SectionsComponent } from './sections.component';

class MockBoardQuery {
  errorMessage$ = new BehaviorSubject<string>('');
  sectionsHasTasks$ = new BehaviorSubject<SectionHasTasks[]>([]);
}

class MockSectionUsecase implements Partial<SectionUsecase> {
  async fetchBoardItems() {}
  closeAlertDialog() {}
}

class MockAlertDialogService {
  show() {}
}

describe('SectionsComponent', () => {
  let component: SectionsComponent;
  let fixture: ComponentFixture<SectionsComponent>;
  let alertDialogService: AlertDialogService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SectionsComponent],
        providers: [
          { provide: SectionQuery, useClass: MockBoardQuery },
          { provide: SectionUsecase, useClass: MockSectionUsecase },
          { provide: AlertDialogService, useClass: MockAlertDialogService },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();

      alertDialogService = TestBed.inject(AlertDialogService);
    }),
  );

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
