import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DatabaseAdapter } from '../../../infrastructures/adapters/database.adapter';
import { SectionUsecase } from './section.usecase';

class MockDatabaseAdapter implements Partial<DatabaseAdapter> {}

describe('SectionUsecase', () => {
  let usecase: SectionUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore(), { provide: DatabaseAdapter, useClass: MockDatabaseAdapter }],
    });
    usecase = TestBed.inject(SectionUsecase);
  });

  it('should be created', () => {
    expect(usecase).toBeTruthy();
  });
});
