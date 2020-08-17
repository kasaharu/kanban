import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppShellQuery } from './app-shell.query';

describe('AppShellQuery', () => {
  let query: AppShellQuery;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });
    query = TestBed.inject(AppShellQuery);
  });

  it('should be created', () => {
    expect(query).toBeTruthy();
  });
});
