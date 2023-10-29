import { TestBed } from '@angular/core/testing';
import { Authenticator } from '../../../../infrastructures/adapters/authenticator';
import { SectionGateway } from '../../../../infrastructures/gateways/section.gateway';
import { TaskGateway } from '../../../../infrastructures/gateways/task.gateway';

import { BoardStore } from './board.store';
import { BoardUsecase } from './board.usecase';

class MockAuthenticator implements Partial<Authenticator> {}
class MockSectionGateway implements Partial<SectionGateway> {}
class MockTaskGateway implements Partial<TaskGateway> {}

describe('BoardUsecase', () => {
  let usecase: BoardUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BoardUsecase,
        BoardStore,
        { provide: Authenticator, useClass: MockAuthenticator },
        { provide: SectionGateway, useClass: MockSectionGateway },
        { provide: TaskGateway, useClass: MockTaskGateway },
      ],
    });
    usecase = TestBed.inject(BoardUsecase);
  });

  it('should be created', () => {
    expect(usecase).toBeTruthy();
  });
});
