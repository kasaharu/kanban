import { Section } from '../../../domain/models';
import reducer, { actions, State } from './board.store';

describe('board reducer', () => {
  it('action type : saveBoard', () => {
    const state: State = { sections: [] };
    const updatedState: Section[] = [{ id: '1', userId: '1', name: 'test', orderId: 1 }];
    const result = reducer(state, actions.saveSections({ sections: updatedState }));

    expect(result).toEqual({ sections: updatedState });
  });
});
