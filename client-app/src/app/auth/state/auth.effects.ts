import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../service/auth.service';
import * as authActions from './auth.actions';
import {switchMap, map, catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects{

  login$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.login),
    switchMap((action) => this.authService.login(action.username, action.password).pipe(
      map(user => authActions.loginSuccess({user})),
      catchError(error => of(authActions.loginError({error})))
    ))
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.loginSuccess),
    tap((action) => {
      localStorage.setItem("user", JSON.stringify(action.user));
      this.router.navigateByUrl('byproducts')
    })
  ), {dispatch: false})

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.logout),
    tap(() => {
      localStorage.removeItem("user");
      this.router.navigateByUrl('login')
    })
  ), {dispatch: false})

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {
  }
}
