import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialogRef, MdDialogConfig, MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { createSelector } from 'reselect';

import { PlaylistService } from './../../services/api/playlist.service';
import { State, getPlaylistState } from './../../reducers';
import {
  Playlist,
  Track,
  App
} from '../../models';
import * as fromPlaylists from '../../reducers/playlists';
import { PlaylistDialogComponent } from '../../components/playlist-dialog/playlist-dialog.component';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
  providers: [ PlaylistService ]
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  playlist$: Observable<Playlist>;

  public playlistsStore: Observable<fromPlaylists.State>;
  public loginStore: Observable<any>;
  public playlistsEntitiesStore: Observable<Playlist[]>;

  private _playlistSelectSubscription: Subscription;
  // To add playlist dialog
  private dialogRef: MdDialogRef<PlaylistDialogComponent>;

  constructor(
    private _playlistService: PlaylistService,
    private _router: Router,
    private _store: Store<any>,
    public dialog: MdDialog
  ) {
    this.playlistsStore = _store.select(s => s.playlists);
    this.loginStore = _store.select(s => s.login);
    this.playlistsEntitiesStore = _store.select(s => s.playlists.entities);

    const getSelectedPlaylist = createSelector(getPlaylistState, fromPlaylists.getSelected);

    this.playlist$ = _store.select(getSelectedPlaylist);
  }

  ngOnInit() {
    this.loginStore.map(p => p.connected).subscribe((connected: boolean) => {
      if (connected) {
        this._playlistService.find({query: {
            $limit: 100
          }
        }).then(playlists => {
          console.info(playlists);

          // If a playslist exists
          if (playlists.data) {
            this._store.dispatch({
              type: fromPlaylists.ActionTypes.INDEX_PLAYLISTS,
              payload: playlists.data
            });

            // Reload previous playlist if possible
            let id = window.localStorage.getItem('playlist-key');
            if (id) {
              this.selectPlaylist(id);
            }
          }
        });
      } else {
        console.log('Not connected, redirect to login');
        this._router.navigate(['login']);
      }
    });

    this._playlistSelectSubscription = this._store.select(s => s.playlists.selectedPlaylistId).subscribe((id: string) => {
      if (id) {
        this._playlistService.get(id).then(playlist => {
          console.log(playlist);

          this._store.dispatch({
            type: fromPlaylists.ActionTypes.LOAD_PLAYLIST,
            payload: playlist
          });
        });
      }
    });
  }

  ngOnDestroy() {
    this._playlistSelectSubscription.unsubscribe();
  }

  selectPlaylist(id: string) {
    console.log('SELECT ', id);
    window.localStorage.setItem('playlist-key', '' + id);
    this._store.dispatch({
      type: fromPlaylists.ActionTypes.SELECT_PLAYLIST,
      payload: id
    });
  }

  // Call add playlist dialog
  addPlaylist() {
    this.dialogRef = this.dialog.open(PlaylistDialogComponent, <MdDialogConfig>{
      disableClose: false, // for use esc to close dialog
    });
    this.dialogRef.componentInstance.new = true;
  }
}
