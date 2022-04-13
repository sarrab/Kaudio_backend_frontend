import { ActionReducer, Action } from '@ngrx/store';
import { Message } from './../models/message';

export const ActionTypes = {
  ADD_MESSAGE: 'ADD_MESSAGE',
  REMOVE_MESSAGE: 'REMOVE_MESSAGE',
  RESET: 'RESET',
};

export function reducer(state: Message[] = [], action: Action): Message[] {
  switch (action.type) {
    case ActionTypes.ADD_MESSAGE:
      return state.concat(action.payload);

    case ActionTypes.REMOVE_MESSAGE:
      return state;

    case ActionTypes.RESET:
      return [];

    default:
      return state;
  }
}
