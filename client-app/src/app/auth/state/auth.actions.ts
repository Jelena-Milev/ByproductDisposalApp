import { createAction, props } from '@ngrx/store';
import { User } from '../../model/user.model';

export const login = createAction(
  '[Login Component] User Login',
  props<{
    username: string;
    password: string;
  }>()
);

export const loginSuccess = createAction(
  '[Auth Service] User Login Success',
  props<{ user: User }>()
);

export const loginError = createAction(
  '[Auth Service] User Login Error',
  props<{ error: any }>()
);

export const logout = createAction(
  '[Header Component] User Logout'
);

export const autoLogin = createAction(
  '[Auth Guard] Auto Login',
  props<{ user: User }>()
);
