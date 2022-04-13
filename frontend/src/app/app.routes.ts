import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './containers/+home/home.component';
import { PlaylistsComponent } from './containers/playlists/playlists.component';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { ProfileDetailComponent } from './containers/profile/profile-detail.component';
 import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';

export const ROUTES: Routes = [
  { path: '',           component: HomeComponent },
  { path: 'home',       component: HomeComponent },
  { path: 'playlists',  component: PlaylistsComponent },
  // { path: 'about',   component: AboutComponent },
  { path: 'login',      component: LoginComponent },
  { path: 'register',   component: RegisterComponent },
  { path: 'profile',    component: ProfileComponent },
  { path: 'profile/:id', component: ProfileDetailComponent },
  { path: '**', component: PageNotFoundComponent }
];
