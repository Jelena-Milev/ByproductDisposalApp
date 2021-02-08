import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';
import {map} from 'rxjs/operators';

interface UserData {
  username: string;
  expiresIn: number;
  role: [{ authority: string }];
  authToken: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User>{
    return this.http.post<UserData>('http://localhost:8888/byproduct-disposal/login', {
      username, password })
      .pipe(
      map(userData => {
        const role = userData.role[0].authority.split('_')[1];
        const user = {
          ...userData,
          role
        };
        return {
          ...user,
          username
        }
      })
    );
  }
}
