import { TestBed } from '@angular/core/testing';

import { HomeUsecase } from './home.usecase';

describe('HomeUsecase', () => {
  let usecase: HomeUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    usecase = TestBed.inject(HomeUsecase);
  });

  it('should be created', () => {
    expect(usecase).toBeTruthy();
  });
});