import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { MessageService } from './../../services/api/message.service';
import { AuthenticationService } from './../../services/api/authentication.service';
import { User, Message } from '../../models';
import { ActionTypes as LoginActionTypes } from './../../reducers/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthenticationService, MessageService ]
})
export class LoginComponent implements OnInit {
  private _messages: any[] = [];
  private error: string;
  user = new User('super@admin.com', 'adminPwd');
  token: string;

  constructor (
    private _messageService: MessageService,
    private _authService: AuthenticationService,
    private _router: Router,
    private _store: Store<any>
  ) {
    this._messageService = _messageService;
    this._authService = _authService;
  }

  ngOnInit() {
    this.token = this._authService.getToken();
  }

  onSubmit() {
    console.log(`do login (${this.user.email})`);

    this._authService.auth(this.user.email, this.user.password).then((result) => {
      console.log('Authenticated!', result);

      this.token = this._authService.getToken();

      window.localStorage.setItem('userId', result.data._id);

      this.error = '';

      this._store.dispatch({
        type: LoginActionTypes.CONNECTED
      });

      this._messageService.create(<Message> {
        title: `${this.user.email} is logged`,
        description: `User ${this.user.email} just logged in ! (or try to...)`
      });

      this._router.navigate(['/']);
    }).catch(error => {
      console.error('Error authenticating!', error);
      this.error = 'Invalid login or password.';
    });
  }

  onLogout() {
    this._authService.logout();
    this.token = null;

    this._store.dispatch({
      type: LoginActionTypes.DISCONNECTED
    });

    this._router.navigate(['login']);
  }
}
