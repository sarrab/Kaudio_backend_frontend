import { Component, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import { MessageService } from './../../services/api/message.service';
import { Message } from './../../models';
import { ActionTypes as MessagesActionTypes } from './../../reducers/messages';

@Component({
  selector: 'app-livefeed',
  templateUrl: './livefeed.component.html',
  styleUrls: ['./livefeed.component.scss'],
  providers: [ MessageService ]
})
export class LivefeedComponent implements AfterViewChecked {
  @ViewChild('feed') private feedContainer: ElementRef;
  public messages$: Observable<Message[]>;

  constructor(
    private _messageService: MessageService,
    private _store: Store<any>
  ) {
    this.messages$ = _store.select(s => s.messages);
  }

  /**
   * Scroll to the bottom of the live each time there is a new message
   */
  ngAfterViewChecked() {
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }

  sendMessage(message: string) {
    const messageO = <Message> {
      title: message
    };

    this._messageService.create(messageO);

    this._store.dispatch({
      type: MessagesActionTypes.ADD_MESSAGE,
      payload: messageO
    });
  }
}
