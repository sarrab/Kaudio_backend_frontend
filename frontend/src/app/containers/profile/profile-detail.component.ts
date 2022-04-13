import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { md5 } from './md5';
import { PlaylistService } from '../../services/api/playlist.service';
import { User } from '../../models/user';
import { UserService } from '../../services/api/user.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  providers: [UserService, PlaylistService],
  styleUrls: ['./profile-detail.component.scss'],
})
export class ProfileDetailComponent implements OnInit {
    public user: User;
    public playlists;
    public createdAt: string;
    public gravatar: string;
    public connectedUserId: string;
    public viewedUserId: string;

    constructor(
        private _userService: UserService,
        private _playlistService: PlaylistService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.connectedUserId = window.localStorage.getItem('userId');
            this.viewedUserId = params['id'];

            this._userService.get(this.viewedUserId).then(user => {
                this.user = user;
                this.createdAt = user.createdAt.substr(0, 10);
                this.gravatar = md5(this.user.email);

                if (!this.user.hasOwnProperty('friends')) {
                    this.user.friends = [];
                }
            });

            this._playlistService.find({query: {
                    user_ref: this.viewedUserId
                }
            }).then(playlists => {
                console.log(playlists);
                this.playlists = playlists.data;
            });
        });
    }
}
