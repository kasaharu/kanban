import { TestBed } from '@angular/core/testing';

import { SectionUsecase } from './section.usecase';

describe('SectionUsecase', () => {
  let usecase: SectionUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    usecase = TestBed.inject(SectionUsecase);
  });

  it('should be created', () => {
    expect(usecase).toBeTruthy();
  });
});