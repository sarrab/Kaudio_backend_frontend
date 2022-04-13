import { ActionReducer, Action } from '@ngrx/store';
import { createSelector } from 'reselect';
import { Playlist, Track } from './../models';

export const ActionTypes = {
  LOAD_PLAYLIST: 'LOAD_PLAYLIST',
  SELECT_PLAYLIST: 'SELECT_PLAYLIST',

  INDEX_PLAYLISTS: 'INDEX_PLAYLISTS',
  INDEX_PLAYLISTS_SUCCESS: 'INDEX_PLAYLISTS_SUCCESS',
  INDEX_PLAYLISTS_FAIL: 'INDEX_PLAYLISTS_FAIL',

  ADD_PLAYLIST: 'ADD_PLAYLIST',
  ADD_PLAYLIST_SUCCESS: 'ADD_PLAYLIST_SUCCESS',
  ADD_PLAYLIST_FAIL: 'ADD_PLAYLIST_FAIL',

  UPDATE_PLAYLIST: 'UPDATE_PLAYLIST',
  UPDATE_PLAYLIST_SUCCESS: 'UPDATE_PLAYLIST_SUCCESS',
  UPDATE_PLAYLIST_FAIL: 'UPDATE_PLAYLIST_FAIL',

  REMOVE_PLAYLIST: 'REMOVE_PLAYLIST',
  REMOVE_PLAYLIST_SUCCESS: 'REMOVE_PLAYLIST_SUCCESS',
  REMOVE_PLAYLIST_FAIL: 'REMOVE_PLAYLIST_FAIL',

  ADD_SONG_PLAYLIST: 'ADD_SONG_PLAYLIST',
  ADD_SONG_PLAYLIST_SUCCESS: 'ADD_SONG_PLAYLIST_SUCCESS',
  ADD_SONG_PLAYLIST_FAIL: 'ADD_SONG_PLAYLIST_FAIL',

  REMOVE_SONG_PLAYLIST: 'REMOVE_SONG_PLAYLIST',
  REMOVE_SONG_PLAYLIST_SUCCESS: 'REMOVE_SONG_PLAYLIST_SUCCESS',
  REMOVE_SONG_PLAYLIST_FAIL: 'REMOVE_SONG_PLAYLIST_FAIL',

  RESET_PLAYLISTS: 'RESET'
};

export interface State {
  entities: { [id: string]: Playlist };
  selectedPlaylistId: string | null;
};

const initialState: State = {
  entities: {},
  selectedPlaylistId: null,
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionTypes.INDEX_PLAYLISTS:
      const playlists: any[] = action.payload;

      return {
        entities: playlists.reduce((map, obj) => {
          map[obj._id] = obj;
          return map;
        }, {}),
        selectedPlaylistId: state.selectedPlaylistId
      };

    case ActionTypes.LOAD_PLAYLIST:
      const playlist: Playlist = action.payload;


      // Do not load 2 times the same playlist
      const key = Object.keys(state.entities).indexOf(playlist._id);
      if (key > -1 && state.entities[playlist._id].tracks) {
        console.log('NO NEED AN UPDATE');

        return state;
      }

      return {
        entities: Object.assign({}, state.entities, {
          [playlist._id]: playlist
        }),
        selectedPlaylistId: state.selectedPlaylistId,
      };

    case ActionTypes.SELECT_PLAYLIST: {
      return {
        entities: state.entities,
        selectedPlaylistId: action.payload
      };
    }

    case ActionTypes.UPDATE_PLAYLIST_SUCCESS:
    case ActionTypes.ADD_PLAYLIST_SUCCESS: {
      const playlist: Playlist = action.payload;
      return {
        entities: Object.assign({}, state.entities, {
          [playlist._id]: playlist
        }),
        selectedPlaylistId: state.selectedPlaylistId,
      };
    }

    case ActionTypes.REMOVE_PLAYLIST_SUCCESS: {
      const id: string = action.payload;

      let entitiesClone: { [id: string]: Playlist } = Object.assign({}, state.entities);
      delete entitiesClone[id];

      return {
        entities: entitiesClone,
        selectedPlaylistId: null,
      };
    }

    case ActionTypes.ADD_SONG_PLAYLIST_SUCCESS: {
      const playlistID: string = action.payload.playlistID;
      const newTrack: Track = action.payload.track;

      let entitiesClone: { [id: string]: Playlist } = Object.assign({}, state.entities);
      entitiesClone[playlistID].tracks.push(newTrack);

      return {
        entities: entitiesClone,
        selectedPlaylistId: state.selectedPlaylistId,
      };
    }

    case ActionTypes.REMOVE_SONG_PLAYLIST_SUCCESS: {
      const playlistID: string = action.payload.playlistID;
      const oldTrackID: string = action.payload.trackID;

      // Clone the playlist where to remove the track
      const playlistClone = Object.assign({}, state.entities[playlistID]);
      playlistClone.tracks = state.entities[playlistID].tracks.filter(t => t['_id'] !== oldTrackID);

      return {
        entities: Object.assign({}, state.entities, {
          [playlistID]: playlistClone
        }),
        selectedPlaylistId: state.selectedPlaylistId,
      };
    }

    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;

export const getSelectedId = (state: State) => state.selectedPlaylistId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});
