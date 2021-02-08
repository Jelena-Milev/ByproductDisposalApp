import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../state';
import {logout} from '../auth/state/auth.actions';
import {Observable} from 'rxjs';
import {isLoggedIn} from '../auth/state/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: String = "Phoenix Pharma";
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
  }

  ngOnInit(): void {
  }

  logout(){
    this.store.dispatch(logout());
  }

}
