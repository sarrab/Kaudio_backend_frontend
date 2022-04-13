import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { AuthenticationService } from './../../services/api/authentication.service';
import { ActionTypes as LoginActionTypes } from './../../reducers/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [ AuthenticationService ]
})
export class NavigationComponent {
  public login$: Observable<boolean>;

  constructor(
    private _store: Store<any>,
    private _authService: AuthenticationService,
    private _router: Router
  ) {
    this.login$ = _store.select(s => s.login);
    this._authService = _authService;
   }

  onLogout() {
    this._authService.logout();

    this._store.dispatch({
      type: LoginActionTypes.DISCONNECTED
    });

    this._router.navigate(['login']);
  }

}
