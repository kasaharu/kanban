import { TestBed } from '@angular/core/testing';

import { AppInitializerService } from './app-initializer.service';
import { Authenticator } from './infrastructures/adapters/authenticator';

class MockAuthenticator implements Partial<Authenticator> {}

describe('AppInitializerService', () => {
  let service: AppInitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Authenticator, useClass: MockAuthenticator }],
    });
    service = TestBed.inject(AppInitializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
