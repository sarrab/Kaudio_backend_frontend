import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Playlist } from '../../models/playlist';
import { PlaylistService } from '../../services/api/playlist.service';
import { Store } from '@ngrx/store';
import { ActionTypes as PlaylistActionTypes } from './../../reducers/playlists';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-playlist-dialog',
  templateUrl: './playlist-dialog.component.html',
  styleUrls: ['./playlist-dialog.component.scss'],
  providers: [ PlaylistService ]
})
export class PlaylistDialogComponent {
  public id: string;
  public new: boolean;  //To know if the dialog is for add or update playlist
  public title: string;
  public description?: string;
  public public?: boolean;
  private playlist: Playlist;

  constructor(
    private _dialogRef: MdDialogRef<PlaylistDialogComponent>,
    private _playlistService: PlaylistService,
    private _store: Store<any>
  ) {
  }

  ngOnInit(){
    //By default the playlist is public
    if (this.new) {
      this.public = true;
    } else if (!this.new) {
      this._store.select(s => s.playlists.selectedPlaylistId).subscribe((id: string) => {this.id = id});
      this._store.select(s => s.playlists.entities[this.id]).subscribe((playlist: Playlist) => {this.playlist = playlist});
      this.title = this.playlist.name;
      this.description = this.playlist.description;
      this.public = this.playlist.public;
    }
  }

  addPlaylist() {
    // New playlist
    this.playlist = <Playlist>{
      name: this.title,
      description: this.description,
      public: this.public
    };

    this._store.dispatch({
        type: PlaylistActionTypes.ADD_PLAYLIST,
        payload: this.playlist
    });

    this._dialogRef.close();
  }

  editPlaylist() {
    this.playlist = <Playlist>{
      _id: this.id,
      name: this.title,
      description: this.description,
      public: this.public
    };

    this._store.dispatch({
        type: PlaylistActionTypes.UPDATE_PLAYLIST,
        payload: {
          id: this.playlist._id,
          name: this.playlist.name,
          description: this.playlist.description,
          public: this.playlist.public
        }
    });
    this._dialogRef.close();
  }
}
