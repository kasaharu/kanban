import reducer, { actions, State } from './error.store';

describe('error reducer', () => {
  it('action type : saveError', () => {
    const state: State = { error: null };
    const updatedState = null;
    const result = reducer(state, actions.saveError({ error: updatedState }));

    expect(result).toEqual({ error: updatedState });
  });
});
