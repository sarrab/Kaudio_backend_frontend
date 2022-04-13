import { ActionReducer, Action } from '@ngrx/store';
import { AudioFile } from './../models';

export const ActionTypes = {
  LOAD_SONG: 'LOAD_SONG',
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  STOP: 'STOP',
}

export function reducer(state: AudioFile = null, action: Action): AudioFile {
    switch (action.type) {
        case ActionTypes.LOAD_SONG:
            return <AudioFile> {
                filepath: action.payload
            };

        default:
            return state;
    }
}
