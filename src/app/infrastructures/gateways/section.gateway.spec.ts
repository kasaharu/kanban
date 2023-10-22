import { TestBed } from '@angular/core/testing';
import { DatabaseAdapter } from '../adapters/database.adapter';
import { SectionGateway } from './section.gateway';

class MockDatabaseAdapter implements Partial<DatabaseAdapter> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
  fetchCollectionWhere(): any {}
}

describe('SectionGateway', () => {
  let service: SectionGateway;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DatabaseAdapter, useClass: MockDatabaseAdapter }],
    });
    service = TestBed.inject(SectionGateway);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
