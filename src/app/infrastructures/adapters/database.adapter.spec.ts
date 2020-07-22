import { TestBed } from '@angular/core/testing';

import { DatabaseAdapter } from './database.adapter';

describe('DatabaseAdapter', () => {
  let adapter: DatabaseAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    adapter = TestBed.inject(DatabaseAdapter);
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });
});
