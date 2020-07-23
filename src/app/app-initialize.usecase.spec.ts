import { TestBed } from '@angular/core/testing';

import { AppInitializeUsecase } from './app-initialize.usecase';

describe('AppInitializeUsecase', () => {
  let usecase: AppInitializeUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    usecase = TestBed.inject(AppInitializeUsecase);
  });

  it('should be created', () => {
    expect(usecase).toBeTruthy();
  });
});