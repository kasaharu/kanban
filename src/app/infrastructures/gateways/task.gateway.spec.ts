import { TestBed } from '@angular/core/testing';
import { TaskGateway } from './task.gateway';

describe('TaskGateway', () => {
  let service: TaskGateway;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskGateway);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
