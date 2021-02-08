import {createFeatureSelector, createSelector} from '@ngrx/store';
import {authFeatureKey, AuthState} from './index';

const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const isLoggedIn = createSelector(
  selectAuthState,
  auth => !!auth.user
);
