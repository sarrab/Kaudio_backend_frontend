import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { PushNotificationsService } from 'angular2-notifications';

import { Message } from './../models';
import { MessageService } from '../services/api/message.service';
import { SocketService } from '../services/socket.service';
import { ActionTypes as MessageActionTypes } from '../reducers/messages';

@Injectable()
export class MessageEffects {

  @Effect({ dispatch: false })
  messageActions$: Observable<Action> = this._messageService.observe('created')
    .do((message: Message) => {
      this._pushNotifications.create(`Kaudio - ${message.title}`, {
        body: message.description || ''
      }).subscribe(
            res => console.log(res),
            err => console.error(err)
      );
      console.info('(MessageEffects) Got a new message, dispatch it', message); // dev
      this._store.next(<Action> {
        type: MessageActionTypes.ADD_MESSAGE,
        payload: message
      });
    });

  constructor(
    private _messageService: MessageService,
    private _pushNotifications: PushNotificationsService,
    private actions$: Actions,
    private _store: Store<any>
  ) {
    this._pushNotifications.requestPermission();
  }

  // @Effect()
  // messageActions2$: Observable<Action> = this._messageService.observe('created').do(message => {
  //   console.log('bbbzxc', message);
  //   console.log('bbbzxc2', message);
  //   return <Action> {
  //     type: MessageActionTypes.ADD_MESSAGE,
  //     payload: <Message> {
  //       title: message.message
  //     }
  //   };
  // });

//   this._socket.on('created', message => this.dispatch(message.message));

  // @Effect({ dispatch: false })
  // messages$: Observable<any> = this._messageService.observe('created');
  // Observable<any> = defer(() => {
  //   console.log('---->');
  //   return this._socketService.observe('created');
  // });

  // @Effect() message$ = this.actions$
  //     // Listen for the 'ADD_MESSAGE' action
  //     .ofType(ActionTypes.ADD_MESSAGE)
  //     // Map the payload into JSON to use as the request body
  //     .map(action => JSON.stringify(action.payload))
  //     .switchMap(payload => this.http.post('/auth', payload)
  //       // If successful, dispatch success action with result
  //       .map(res => ({ type: MessagesActionTypes.ADD_MESSAGE_SUCCESS, payload: res.json() }))
  //       // If request fails, dispatch failed action
  //       .catch(() => Observable.of({ type: 'LOGIN_FAILED' }))
  //     );
}
