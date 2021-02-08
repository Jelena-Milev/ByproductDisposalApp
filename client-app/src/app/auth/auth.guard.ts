import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../state';
import {isLoggedIn} from './state/auth.selectors';
import {tap} from 'rxjs/operators';
import {autoLogin, login} from './state/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store:Store<AppState>,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userProfile = localStorage.getItem("user");
    const user = JSON.parse(userProfile);
    if(user){
      this.store.dispatch(autoLogin({user}));
    }

    return this.store.pipe(
      select(isLoggedIn),
      tap((isLoggedIn) => {
        if(!isLoggedIn){
          this.router.navigateByUrl('login');
        }
      }));
  }
}
