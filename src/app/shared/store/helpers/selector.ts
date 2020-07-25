import { createFeatureSelector, createSelector, Store } from '@ngrx/store';

export function createFeatureStoreSelector<T>(featureName: string) {
  return <S>(store$: Store<{}>, mappingFunction: (state: T, props?: any) => S) => {
    return store$.select(createSelector(createFeatureSelector<T>(featureName), mappingFunction));
  };
}
