import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Authenticator } from '../../../infrastructures/adapters/authenticator';
import { AppInitializer } from './app-initialize.usecase';

class MockAuthenticator implements Partial<Authenticator> {}

describe('AppInitializer', () => {
  let usecase: AppInitializer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore(), { provide: Authenticator, useClass: MockAuthenticator }],
    });
    usecase = TestBed.inject(AppInitializer);
  });

  it('should be created', () => {
    expect(usecase).toBeTruthy();
  });
});
