import { createReducer, on } from '@ngrx/store';
import { User } from '../../model/user.model';
import * as authActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
}

const initialState: AuthState = {
  user: undefined
};

export const reducer = createReducer(
  initialState,
  on(authActions.loginSuccess, (state, action) => {
    return {
      user: action.user
    }
  }),
  on(authActions.logout, (state, action) => {
    return {
      user: undefined
    }
  }),
  on(authActions.autoLogin, (state, action) => {
    return {
      user: action.user
    }
  })
);
