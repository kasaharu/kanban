import reducer, { actions, State } from './app-shell.store';

describe('appShell reducer', () => {
  it('action type : saveAppShell', () => {
    const state: State = { appShell: null };
    const updatedState = null;
    const result = reducer(state, actions.saveAppShell({ appShell: updatedState }));

    expect(result).toEqual({ appShell: updatedState });
  });
});
