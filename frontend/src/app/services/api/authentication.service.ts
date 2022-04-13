import { Injectable } from '@angular/core';
import { RestService } from './../rest.service';
import { SocketService } from './../socket.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private _rest: RestService
  ) { }

  auth(email: string, password: string) {
    return this._rest.getApp().authenticate({
        type: 'local',
        email: email,
        password: password
      });
  }

  getUser() {
    return this._rest.getApp().get('user');
  }

  getToken() {
    return this._rest.getApp().get('token');
  }

  logout() {
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('playlist-key');
    return this._rest.getApp().logout();
  }
}

