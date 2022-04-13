import { ApiSearchComponent } from './../apisearch/apisearch.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AboutComponent } from '../about/about.component';
import { ProfileComponent } from '../profile/profile.component';

export const routes = [
  { path: '', component: AboutComponent, pathMatch: 'full' }
  // {
  //   path: '',
  //   component: HomeComponent,
  //   children: [
  //     {
  //       path: 'profile',
  //       component: ProfileComponent
  //     }
  //   ]
  // },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomeComponent]
})
export class HomeModule {
  static routes = routes;
}
