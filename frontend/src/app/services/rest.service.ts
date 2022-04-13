import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { FeathersService } from './feathers.service';

const superagent = require('superagent');
const feathers = require('feathers/client');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest/client');
const authentication = require('feathers-authentication/client');

@Injectable()
export class RestService extends FeathersService {

  constructor(
  ) {
    super();
    this._app = feathers()
      .configure(rest(environment.serverHost).superagent(superagent)) // Fire up rest
      .configure(hooks())
      .configure(authentication({ storage: window.localStorage }));

    if (window.localStorage.getItem('feathers-jwt')) {
      this._app.set('token', window.localStorage.getItem('feathers-jwt'));
    }
  }
}
