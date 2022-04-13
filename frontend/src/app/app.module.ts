import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertModule, TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { MaterialModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; // Dev tool
import { PushNotificationsModule } from 'angular2-notifications';
import 'hammerjs';

import { ROUTES } from './app.routes';

import { reducers } from './reducers';

// Pipes
import { KeysPipe } from './pipes/keys';

// Services
import { RestService } from './services/rest.service';
import { SocketService } from './services/socket.service';
import { MessageService } from './services/api/message.service';
import { PlaylistService } from './services/api/playlist.service';

// Effects
import { MessageEffects } from './effects/messages';
import { PlaylistEffects } from './effects/playlist';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './containers/+home/home.component';
import { AboutComponent } from './containers/about/about.component';
import { LoginComponent } from './containers/login/login.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { ProfileDetailComponent } from './containers/profile/profile-detail.component';
import { RegisterComponent } from './containers/register/register.component';
import { PlaylistsComponent } from './containers/playlists/playlists.component';
import { ApiSearchComponent } from './containers/apisearch/apisearch.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AudiobarComponent } from './components/audiobar/audiobar.component';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { SearchresultsComponent } from './components/searchresults/searchresults.component';
import { PlaylistDialogComponent } from './components/playlist-dialog/playlist-dialog.component';
import { LivefeedComponent } from './components/livefeed/livefeed.component';
import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    KeysPipe,
    AppComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileDetailComponent,
    PlaylistComponent,
    SidebarComponent,
    PlaylistsComponent,
    AudiobarComponent,
    ApiSearchComponent,
    SearchboxComponent,
    SearchresultsComponent,
    PlaylistDialogComponent,
    LivefeedComponent,
    PageNotFoundComponent,
  ],
  entryComponents: [
    PlaylistDialogComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.provideStore(reducers),
    EffectsModule.run(MessageEffects),
    EffectsModule.run(PlaylistEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension(), // Dev tool
    FormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    AlertModule,
    NgxDatatableModule,
    TypeaheadModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    PushNotificationsModule
  ],
  providers: [
    SocketService,
    RestService,
    MessageService,
    PlaylistService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
