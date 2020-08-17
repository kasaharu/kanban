import { Section } from '../../../domain/models';
import reducer, { actions, initialState, State } from './board.store';

describe('board reducer', () => {
  it('action type : saveBoard', () => {
    const state: State = initialState;
    const updatedState: Section[] = [{ id: '1', userId: '1', name: 'test', orderId: 1 }];
    const result = reducer(state, actions.saveSections({ sections: updatedState }));

    expect(result).toEqual({ ...state, sections: updatedState });
  });
});
