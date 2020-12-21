import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Authenticator } from '../../../infrastructures/adapters/authenticator';
import { HeaderUsecase } from './header.usecase';

class MockAuthenticator implements Partial<Authenticator> {}

describe('HeaderUsecase', () => {
  let usecase: HeaderUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({}), { provide: Authenticator, useClass: MockAuthenticator }],
    });
    usecase = TestBed.inject(HeaderUsecase);
  });

  it('should be created', () => {
    expect(usecase).toBeTruthy();
  });
});
