import { Component, Input } from '@angular/core';
import { MdDialogRef, MdDialogConfig, MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Track } from '../../models';

import { Playlist } from '../../models/playlist';
import { PlaylistService } from '../../services/api/playlist.service';
import { ActionTypes as PlayerActionTypes } from './../../reducers/player';
import { ActionTypes as PlaylistsActionTypes } from './../../reducers/playlists';
import { PlaylistDialogComponent} from '../playlist-dialog/playlist-dialog.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  providers: [ PlaylistService ]
})
export class PlaylistComponent {
  @Input() playlist: Playlist;

  private dialogRef: MdDialogRef<PlaylistDialogComponent>;
  private selected = [];
  private columns = [
    { name: 'Song', prop: 'title', comparator: false },
    { name: 'Album', prop: 'album.title' },
    { name: 'Artist', prop: 'album.artist.name' }
  ];

  public player: Observable<any>;

  constructor(
    public dialog: MdDialog,
    private _playlistService: PlaylistService,
    private _store: Store<any>
  ) {
    this.player = _store.select(s => s.player);
  }

  onSort(event) {
    // event was triggered, start sort sequence
    console.log('Sort Event', event);
  }

  updatePlaylist() {
    this.dialogRef = this.dialog.open(PlaylistDialogComponent, <MdDialogConfig>{
      disableClose: false, //for use esc to close dialog
    });
    this.dialogRef.componentInstance.new = false;
  }

  deletePlaylist() {
    this._store.dispatch({
      type: PlaylistsActionTypes.REMOVE_PLAYLIST,
      payload: this.playlist._id
    });
  }

  deleteSelectedSong() {
    if (this.selected.length === 0) {
      return;
    }

    this._store.dispatch({
      type: PlaylistsActionTypes.REMOVE_SONG_PLAYLIST,
      payload: {
        playlistID: this.playlist._id,
        trackID: this.selected[0]._id // We can only select one song
      }
    });
  }

  onActivate(event) {
    if (event.type === 'click') {
      console.log(event);
    }

    if (event.type === 'dblclick') {
      let row = event.row;
      console.log('This id will be played', row._id);

      this._store.dispatch({
        type: PlayerActionTypes.LOAD_SONG,
        payload:  row._id
      });
    }
  }
}
