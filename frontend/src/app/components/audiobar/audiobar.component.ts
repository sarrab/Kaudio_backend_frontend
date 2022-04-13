import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AudioFile } from './../../models';

declare let plyr: any;
// declare let Hls: any;

@Component({
  selector: 'app-audiobar',
  templateUrl: './audiobar.component.html',
  styleUrls: ['./audiobar.component.scss']
})
export class AudiobarComponent implements OnInit, OnDestroy {

  // private _player;
  player: Observable<AudioFile>;
  _playerSubscription: Subscription;

  constructor(
    private _store: Store<any>
  ) {
    this.player = _store.select(s => s.player);
  }

  ngOnInit() {
    let inst = plyr.setup({
      volume: 9
    })[0];

    const token = window.localStorage.getItem('feathers-jwt');

// .take(1)
    this._playerSubscription = this.player.subscribe((player: AudioFile) => {

      if (player) {
        console.info('Update player source file !');
        console.info(inst);

        inst.source({
          type: 'audio',
          sources: [{
            // 586d552315672421864793f2
            // 586d55231567242186479409
            src: `/audios/${player.filepath}?token=${token}`,
            type: 'audio/mp3'
          }]
        })
      }
    })

// let config = {
//   xhrSetup: function(xhr, url) {
//     xhr.withCredentials = true; // do send cookies
//   }
// }
//let hlsc = new Hls(config);

//   if(Hls.isSupported()) {
//     var video = document.getElementById('video');
//     var hlsc = new Hls();
//     hlsc.loadSource('http://www.streambox.fr/playlists/test_001/stream.m3u8');
//     hlsc.attachMedia(video);
//     hlsc.on(Hls.Events.MANIFEST_PARSED, function() {


//   });
//  }

// a.on('ready', function(event) {
//   console.log('asdsffsdfdfs');
// });

    // this._player.source({
    //   type:       'audio',
    //   title:      'Example title',
    //   sources: [{
    //     src:      'http://localhost:3030/audios/585119cbdda1611abee6a21d',
    //     type:     'audio/mp3'
    //   }]
    // //   {
    // //     src:      '/path/to/audio.ogg',
    // //     type:     'audio/ogg'
    // //   }]
    // });
  }

  ngOnDestroy() {
    this._playerSubscription.unsubscribe();
  }
}
