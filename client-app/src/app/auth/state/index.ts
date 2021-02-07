import { ActionReducerMap, createReducer, MetaReducer } from '@ngrx/store';
import { User } from '../../model/user.model';

export const authFeatureKey = 'auth';

export interface State {
  user: User;
}

const initialState = {
  user: undefined,
};

export const reducer = createReducer(initialState);
