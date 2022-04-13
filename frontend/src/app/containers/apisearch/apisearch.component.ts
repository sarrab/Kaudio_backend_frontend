import { State } from './../../reducers/index';
import { ActionTypes } from './../../reducers/messages';
import { MessageService } from './../../services/api/message.service';
import { ApiSearchService } from './../../services/api/api-search.service';
import { Track } from './../../models/track';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as PlaylistRedux from './../../reducers/playlists';

@Component({
  selector: 'app-search',
  templateUrl: './apisearch.component.html',
  styleUrls: ['./apisearch.component.scss'],
  providers: [ ApiSearchService, MessageService ]
})
export class ApiSearchComponent implements OnInit, OnDestroy {

  public selected: string = '';
  tracks: Observable<Track[]>;
  searchTerm = new BehaviorSubject<string>('');

  constructor(
    private _apiSearchService: ApiSearchService,
  ) {}

  ngOnInit() {
    this.tracks = this.searchTerm
      .debounceTime(100)        // wait for 100ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        ? this._apiSearchService.search(term).then((res: any) => res.data)
        : Observable.of([]))
      .catch(error => {
        console.error(this.tracks);
        return Observable.of<Track[]>([]);
      });
  }

  ngOnDestroy() {
    this.searchTerm.unsubscribe();
  }
}
