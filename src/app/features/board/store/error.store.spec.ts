import { ErrorTypeEnum, mappingErrorMessage } from '../presenters/helpers/error-message';
import reducer, { actions, State } from './error.store';

describe('error reducer', () => {
  it('action type : saveError', () => {
    const state: State = { errorType: null, errorMessage: mappingErrorMessage[ErrorTypeEnum.OverSectionNameLength] };
    const updatedState = ErrorTypeEnum.OverSectionNameLength;
    const result = reducer(state, actions.setError({ errorType: updatedState }));

    expect(result).toEqual({ ...state, errorType: updatedState });
  });
});
