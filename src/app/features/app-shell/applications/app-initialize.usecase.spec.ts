import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Authenticator } from '../../../infrastructures/adapters/authenticator';
import { AppInitializeUsecase } from './app-initialize.usecase';

class MockAuthenticator implements Partial<Authenticator> {}

describe('AppInitializeUsecase', () => {
  let usecase: AppInitializeUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore(), { provide: Authenticator, useClass: MockAuthenticator }],
    });
    usecase = TestBed.inject(AppInitializeUsecase);
  });

  it('should be created', () => {
    expect(usecase).toBeTruthy();
  });
});
