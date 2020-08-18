import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { BoardQuery } from './board.query';

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
