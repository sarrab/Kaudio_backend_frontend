import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { md5 } from './md5';
import 'rxjs/add/observable/of';

import { User, Message } from '../../models';
import { UserService } from '../../services/api/user.service';
import { MessageService } from '../../services/api/message.service';
import { AdminService } from '../../services/api/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ UserService, AdminService ]
})
export class ProfileComponent implements OnInit {

  public stateCtrl: FormControl = new FormControl();
  private _messages: any[] = [];
  private userId: string;
  private connected: boolean = false;
  private musicPath: string = './music';
  public user: User;
  public myForm: FormGroup = new FormGroup({
    state: this.stateCtrl
  });
  public selected: string = '';
  public dataSource: Observable<any>;
  public asyncSelected: string = '';
  public typeaheadLoading: boolean = false;
  public typeaheadNoResults: boolean = false;
  public gravatar: string;
  public reindexed: number = -1;

  constructor(
    private _userService: UserService,
    private _messageService: MessageService,
    private _adminService: AdminService,
    private _router: Router,
  ) {
    this.dataSource = Observable.create(observer => {
      // Updates autocomplete of friends list.
      // Is executed everytime a new letter is typed.
      if (this.asyncSelected.length > 0) {
        this._userService.find({
          query: {
            email: {
              $search: this.asyncSelected
            }
          }
        }).then(res => {
          observer.next(res.data);
        });
      }
    }).mergeMap((res: Object) => Observable.of(res));
  }

  ngOnInit() {
    this.userId = window.localStorage.getItem('userId');

    // Check if the user is connected and has a valid ID.
    if (this.userId && this.userId.length > 6) {
      this.connected = true;
      this._userService.get(this.userId).then(user => {
        this.user = user;

        if (this.user.email) {
          this.gravatar = md5(this.user.email);
        }

        if (!this.user.hasOwnProperty('friends')) {
          this.user.friends = [];
        }
      });
    }
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  /**
   * Called when the user clicks on an entry of the autocomplete list.
   */
  public typeaheadOnSelect(e: TypeaheadMatch): void {
    if (e.item._id !== this.userId &&
      this.user.friends.filter(f => e.item._id === f['_id']).length === 0) {
      this.user.friends.push(e.item);
    }
    this.asyncSelected = '';
  }

  /**
   * If thes user cancels, he is redirect to his public profile view.
   */
  onLogout() {
    this._router.navigate(['profile', this.userId]);
  }

  /**
   * Updates the user in the database.
   */
  onSubmit() {
    // Clone user
    const userClone = Object.assign({}, this.user);

    userClone.friends_ref = this.user.friends.map(f => f['_id']);
    delete userClone.friends;

    // Saves the user and redirects to public profile view.
    this._userService.update(this.userId, userClone).then(() => {
      this._messageService.create(<Message> {
        title: 'Profile updated !',
        description: `${this.user.email} just updated his profile`
      }).then(() => {
        this._router.navigate(['profile', this.userId]);
      });
    });
  }

  /**
   * Called when a user wants to delete a friend from the list.
   */
  onRemove(user) {
    // Deletes the selected friend filtering the list.
    this.user.friends = this.user.friends.filter(f => f !== user);
  }

  uploadMusic() {
    this.reindexed = 0;
    this._adminService.create({
      path: this.musicPath
    }).then(() => this.reindexed = 1);
  }
}
