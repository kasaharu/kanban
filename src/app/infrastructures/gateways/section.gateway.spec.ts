import { TestBed } from '@angular/core/testing';
import { SectionGateway } from './section.gateway';

describe('SectionGateway', () => {
  let service: SectionGateway;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionGateway);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
