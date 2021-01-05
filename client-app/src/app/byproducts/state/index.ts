import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Byproduct } from '../../model/byproduct.model';
import * as byproductActions from './byproduct.actions';

export const byproductsFeatureKey = 'byproducts';

export interface ByproductsState extends EntityState<Byproduct> {
  byproductsLoaded: boolean;
}

export const adapter: EntityAdapter<Byproduct> = createEntityAdapter<Byproduct>();

const initialByproductsState = adapter.getInitialState({
  byproductsLoaded: false,
});

export const byproductsReducer = createReducer(
  initialByproductsState,
  on(byproductActions.loadByproductsSuccess, (state, action) => {
    return adapter.addAll(action.byproducts, {
      ...state,
      byproductsLoaded: true,
    });
  })
);

export const { selectAll } = adapter.getSelectors();
