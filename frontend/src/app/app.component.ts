import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthenticationService } from './services/api/authentication.service';
import { ActionTypes as LoginActionTypes } from './reducers/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ AuthenticationService ]
})
export class AppComponent {
  title = 'Kaudio';

  constructor (
    private _authService: AuthenticationService,
    private _store: Store<any>
  ) {
    this._authService = _authService;

    if (this._authService.getToken()) {
      this._store.dispatch({
        type: LoginActionTypes.CONNECTED
      });
    }
  }
}
