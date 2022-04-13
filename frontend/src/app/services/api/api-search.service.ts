import { Observable } from 'rxjs/Rx';
import { Track } from './../../models/track';

import { Injectable } from '@angular/core';
import { RestService } from './../rest.service';

@Injectable()
export class ApiSearchService {
  private _rest;

  constructor(
    private _restService: RestService
  ) {
    this._rest = _restService.getService('tracks');
  }

  find(query?: any) {
    return this._rest.find(query);
  }

  search(term: string): Promise<Track[]> {
    return this._rest.find({
      query: {
        title: {
          $search: term
        }
      }
    });
  }
}
