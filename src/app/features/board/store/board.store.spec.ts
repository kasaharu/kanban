import reducer, { actions, State } from './board.store';

describe('board reducer', () => {
  it('action type : saveBoard', () => {
    const state: State = { board: null };
    const updatedState = null;
    const result = reducer(state, actions.saveBoard({ board: updatedState }));

    expect(result).toEqual({ board: updatedState });
  });
});
