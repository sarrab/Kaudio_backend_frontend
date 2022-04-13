import { Injectable } from '@angular/core';
// import { SocketService } from './../socket.service';
import { RestService } from './../rest.service';
import { Track, Playlist } from '../../models';

@Injectable()
export class AdminService {
  private _service;

  constructor(
    private _restService: RestService
  ) {
    this._service = _restService.getService('/localuploads');
  }

  create(query: any) {
    return this._service.create(query);
  }
}
