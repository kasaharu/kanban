import { TestBed } from '@angular/core/testing';
import { Authenticator } from '../../../infrastructures/adapters/authenticator';
import { HomeUsecase } from './home.usecase';

class MockAuthenticator implements Partial<Authenticator> {}

describe('HomeUsecase', () => {
  let usecase: HomeUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Authenticator, useClass: MockAuthenticator }],
    });
    usecase = TestBed.inject(HomeUsecase);
  });

  it('should be created', () => {
    expect(usecase).toBeTruthy();
  });
});
