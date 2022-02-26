import { actions, reducer, State } from './app-shell.store';

describe('appShell reducer', () => {
  it('action type : initialize', () => {
    const state: State = { loggedInUser: null, readyApp: false };
    const updatedState = null;
    const result = reducer(state, actions.initialize({ loggedInUser: updatedState }));

    expect(result).toEqual({ loggedInUser: updatedState, readyApp: true });
  });
});
