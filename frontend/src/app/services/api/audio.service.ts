import { Injectable } from '@angular/core';
import { RestService } from './../rest.service';

@Injectable()
export class AudioService {
  private _rest;

  constructor(
    private _restService: RestService
  ) {
    this._rest = _restService.getService('audios');
  }

  get(id: string, query?: any) {
    return this._rest.get(id, query);
  }
}
