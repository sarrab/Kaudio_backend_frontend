import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Track } from './../../models';
import { ActionTypes as PlaylistsActionTypes } from './../../reducers/playlists';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchresultsComponent implements OnInit, OnDestroy {
  @Input() tracks: Observable<Track[]>;
  @Output()('SelectTrack') trackToAdd = new EventEmitter<Track>();
  close = false;
  private _playlists: Observable<any>;
  private _selectedPlaylist: string;
  private _playlistsSubscriber: Subscription;
  private _tracksSubscriber: Subscription;

  constructor(
    private _store: Store<any>,
  ) {
    this._playlists = _store.select(s => s.playlists);
  }

  ngOnInit() {
    this._playlistsSubscriber = this._playlists.subscribe(v => {
      this._selectedPlaylist = v.selectedPlaylistId;
    });

    this._tracksSubscriber = this.tracks.subscribe(t => {
      if (t.length > 0) {
        this.close = false;
      }
    });
  }

  ngOnDestroy() {
    this._playlistsSubscriber.unsubscribe();
    this._tracksSubscriber.unsubscribe();
  }

  /**
   * Add the selected track to the selected playlist
   */
  addTrack(track: Track): void {
    this._store.dispatch({
      type: PlaylistsActionTypes.ADD_SONG_PLAYLIST,
      payload: {
        track,
        selectedPlaylist: this._selectedPlaylist,
      }
    });
  }

  onClose() {
    this.close = true;
  }
}

