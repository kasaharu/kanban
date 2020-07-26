import { TestBed } from '@angular/core/testing';

import { BoardQuery } from './board.query';

describe('BoardQuery', () => {
  let query: BoardQuery;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    query = TestBed.inject(BoardQuery);
  });

  it('should be created', () => {
    expect(query).toBeTruthy();
  });
});
