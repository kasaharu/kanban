import { TestBed } from '@angular/core/testing';
import { AppInitializer } from './app-initializer';
import { Authenticator } from './infrastructures/adapters/authenticator';

class MockAuthenticator implements Partial<Authenticator> {}

describe('AppInitializer', () => {
  let service: AppInitializer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Authenticator, useClass: MockAuthenticator }],
    });
    service = TestBed.inject(AppInitializer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
