import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SectionQuery } from './section.query';

describe('SectionQuery', () => {
  let query: SectionQuery;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });
    query = TestBed.inject(SectionQuery);
  });

  it('should be created', () => {
    expect(query).toBeTruthy();
  });
});
