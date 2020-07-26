import { TestBed } from '@angular/core/testing';

import { AppShellQuery } from './app-shell.query';

describe('AppShellQuery', () => {
  let query: AppShellQuery;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    query = TestBed.inject(AppShellQuery);
  });

  it('should be created', () => {
    expect(query).toBeTruthy();
  });
});