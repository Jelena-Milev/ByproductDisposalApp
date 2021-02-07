import { createAction, props } from '@ngrx/store';
import { User } from '../../model/user.model';

const login = createAction(
  '[Login Component] User Login',
  props<{ user: User }>()
);

const logout = createAction(
  '[Logout Component] User Logout',
  props<{ username: string }>()
);
