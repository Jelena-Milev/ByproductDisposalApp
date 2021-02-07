import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedRequest = request.clone({
      headers: request.headers.set("Authorization", `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkemVjYSIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2MTI3MjExMjksImV4cCI6MTYxMjgwNzUyOX0.YJ4rArA-JEfxG9E0vvMbg53nQRpzwraboD9CcaKKKdLvHDUy3qMDVmZfqgiBbFUXrvCQ8ZqR85_tkXtAd7BTCA`)
    });
    return next.handle(modifiedRequest);
  }
}
