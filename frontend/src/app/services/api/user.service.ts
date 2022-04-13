import { Injectable } from '@angular/core';
import { RestService } from './../rest.service';
import { User } from './../../models';
// import { SocketService } from './../socket.service';

@Injectable()
export class UserService {
  // private _socket;
  private _rest;

  constructor(
    private _restService: RestService
  ) {

    this._rest = _restService.getService('users');
    // this._socket = _socketService.getService('user');
  }

  find(query?: any) {
    return this._rest.find(query);
  }

  get(id: string, query?: any) {
    return this._rest.get(id, query);
  }

  create(user: User) {
    return this._rest.create(user);
  }

  update(id: string, user: User) {
    return this._rest.update(id, user);
  }

  remove(id: string, query?: any) {
    return this._rest.remove(id, query);
  }
}
