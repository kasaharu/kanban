import { TestBed } from '@angular/core/testing';
import { DatabaseAdapter } from '../adapters/database.adapter';
import { TaskGateway } from './task.gateway';

class MockDatabaseAdapter implements Partial<DatabaseAdapter> {}

describe('TaskGateway', () => {
  let service: TaskGateway;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DatabaseAdapter, useClass: MockDatabaseAdapter }],
    });
    service = TestBed.inject(TaskGateway);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
