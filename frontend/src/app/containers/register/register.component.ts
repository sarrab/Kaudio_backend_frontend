import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from '../../services/api/message.service';
import { UserService } from '../../services/api/user.service';
import { User, Message } from '../../models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ UserService, MessageService ]
})
export class RegisterComponent implements OnInit {
  private _messages: any[] = [];
  // private _messageService: MessageService;
  user = new User('');
  private connected: boolean = false;

  constructor(
    private _messageService: MessageService,
    private _userService: UserService,
    private _router: Router
  ) {
    this._messageService = _messageService;
    this._userService = _userService;
  }

  ngOnInit(): void {
    this.connected = window.localStorage.getItem('userId') && window.localStorage.getItem('userId').length > 9;
  }

  onSubmit(): void {
    this._userService.create(this.user).then(result => {
      console.log('Registered!', result);

      this._messageService.create(<Message> {
        title: `Welcome to ${this.user.email}`,
        description: `User ${this.user.email} is registered (or try to...)`
      });

      // Redirect to login page
      this._router.navigate(['/login']);
    }).catch(error => {
      console.error('Error registration!', error);
    });
  }
}
