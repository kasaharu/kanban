import reducer, { actions, State, ErrorTypeEnum } from './error.store';

describe('error reducer', () => {
  it('action type : saveError', () => {
    const state: State = { errorType: null, errorMessage: '' };
    const updatedState = ErrorTypeEnum.OverSectionNameLength;
    const result = reducer(state, actions.setError({ errorType: updatedState }));

    expect(result).toEqual({ ...state, errorType: updatedState });
  });
});
