import { createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState, Update} from '@ngrx/entity';
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
  }),
  on(byproductActions.addByproductSuccess, (state, action) => {
    return adapter.addOne(action.savedByproduct, { ...state });
  }),
  on(byproductActions.deleteByproductSuccess, (state, action) => {
    return adapter.removeOne(action.byproductId.toString(), { ...state });
  }),
  on(byproductActions.editByproductSuccess, (state, action) => {
    const update: Update<Byproduct> = {
      id: action.byproduct.id,
      changes: action.byproduct
    }
    return adapter.updateOne(update, {...state})
  })
);

export const { selectAll } = adapter.getSelectors();
