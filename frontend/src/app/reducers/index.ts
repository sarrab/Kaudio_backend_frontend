import * as fromMessages from './messages';
import * as fromPlayer from './player';
import * as fromPlaylists from './playlists';
import * as fromLogin from './login';

export interface State {
  messages: any;
  player: any;
  playlists: fromPlaylists.State;
  login: any;
}

export const reducers: Object = {
  messages: fromMessages.reducer,
  player: fromPlayer.reducer,
  playlists: fromPlaylists.reducer,
  login: fromLogin.reducer
};

export const getPlaylistState = (state: State) => state.playlists;
