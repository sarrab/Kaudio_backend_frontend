import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action, Store } from '@ngrx/store';

import { Playlist } from '../../models/playlist';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent {
  public login$: Observable<boolean>;

  constructor(
    private _store: Store<any>,
  ) {
    this.login$ = _store.select(s => s.login);
  }

  @Input('playlists') playlistsList: Observable<Playlist[]>;
  @Output('selectPlaylist') selectedPlaylist = new EventEmitter<string>();
  currentPlaylistId: string = '';

  selectPlaylist(id: string) {
    this.currentPlaylistId = id;
    this.selectedPlaylist.emit(id);
  }
}

