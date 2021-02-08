import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from './state';
import {selectToken} from './auth/state/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private authToken$: Observable<string>;

  constructor(private store:Store<AppState>) {
    this.authToken$ = this.store.pipe(select(selectToken));
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authToken: string;

    this.authToken$.subscribe(token => authToken = token)

    const modifiedRequest = request.clone({
      headers: request.headers.set("Authorization", `Bearer ${authToken}`)
    });
    return next.handle(modifiedRequest);
  }
}
