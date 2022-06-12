import { TestBed } from '@angular/core/testing';

import { BoardUsecase } from './board.usecase';

describe('BoardUsecase', () => {
  let usecase: BoardUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    usecase = TestBed.inject(BoardUsecase);
  });

  it('should be created', () => {
    expect(usecase).toBeTruthy();
  });
});
