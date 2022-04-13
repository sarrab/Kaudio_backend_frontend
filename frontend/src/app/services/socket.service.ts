import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { FeathersService } from './feathers.service';
import { Observable } from 'rxjs/Observable';

const io = require('socket.io-client');
const feathers = require('feathers/client');
const hooks = require('feathers-hooks');
const socketio = require('feathers-socketio/client');
// const localstorage = require('feathers-localstorage');
const authentication = require('feathers-authentication/client');

@Injectable()
export class SocketService extends FeathersService {
  public socket: SocketIOClient.Socket;

  constructor(
  ) {
    super();
    this.socket = io(environment.serverHost, {
      // transports: ['websocket']
    });
    this._app = feathers()
      .configure(hooks())
      .configure(socketio(this.socket))
      .configure(authentication({ storage: window.localStorage }));

    this.authenticateIfPossible();

    this.socket.io.on('reconnect', () => {
      console.info('--> reconnect');
      // this._app.authenticate();
    });

    // If the transport changes, you have to authenticate again.
    this.socket.io.on('upgrade', transport => {
      console.info('>> transport changed [socket.service]');
      this.authenticateIfPossible();
    });
  }

  private authenticateIfPossible() {
    console.log('-> authenticateIfPossible');

    if (window.localStorage.getItem('feathers-jwt')) {
      this._app.set('token', window.localStorage.getItem('feathers-jwt'));
      console.log(
        window.localStorage.getItem('feathers-jwt')
      );
      console.log(
        this._app.get('token')
      );

      // If we have a token, we can authenticate
      this._app.authenticate().then(res => {
        console.info(res);
        console.log('Authenticated done');
      }).catch((error) => {
        console.error('Error ' + error);
      });
    }
  }

  public on(trigger: string, callback: Function) {
    this.socket.on(trigger, callback);
  }
}
