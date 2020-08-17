import { TestBed } from '@angular/core/testing';
import { BoardQuery } from './board.query';
import { provideMockStore } from '@ngrx/store/testing';

describe('BoardQuery', () => {
  let query: BoardQuery;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });
    query = TestBed.inject(BoardQuery);
  });

  it('should be created', () => {
    expect(query).toBeTruthy();
  });
});
