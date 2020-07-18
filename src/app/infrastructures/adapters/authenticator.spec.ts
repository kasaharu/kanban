import { TestBed } from '@angular/core/testing';

import { Authenticator } from './authenticator';

describe('Authenticator', () => {
  let authenticator: Authenticator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    authenticator = TestBed.inject(Authenticator);
  });

  it('should be created', () => {
    expect(authenticator).toBeTruthy();
  });
});
