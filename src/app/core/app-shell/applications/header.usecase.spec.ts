import { TestBed } from '@angular/core/testing';

import { HeaderUsecase } from './header.usecase';

describe('HeaderUsecase', () => {
  let usecase: HeaderUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    usecase = TestBed.inject(HeaderUsecase);
  });

  it('should be created', () => {
    expect(usecase).toBeTruthy();
  });
});