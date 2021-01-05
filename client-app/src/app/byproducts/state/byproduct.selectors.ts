import { createFeatureSelector, createSelector } from '@ngrx/store';
import { byproductsFeatureKey, ByproductsState } from './index';
import * as fromByproducts from './index';

export const selectByproductsState = createFeatureSelector<ByproductsState>(
  byproductsFeatureKey
);

export const selectByproductsLoaded = createSelector(
  selectByproductsState,
  (state) => state.byproductsLoaded
);

export const selectByproducts = createSelector(
  selectByproductsState,
  fromByproducts.selectAll
);
