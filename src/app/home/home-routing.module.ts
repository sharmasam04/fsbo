import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { SearchDataComponent } from '../search-data/search-data.component';
import { UserManagementComponent } from '../user-management/user-management.component';
import { UserCommentComponent } from '../search-data/user-comment/user-comment.component';

const homeRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [],
    children: [
      {
        path: 'dashboard',
        component: HomeComponent
      },
      {
        path: 'upload-file',
        component: UploadFileComponent
      },
      {
        path: 'search-data',
        component: SearchDataComponent
      },
      {
        path: 'user-management',
        component: UserManagementComponent
      },
      {
        path: 'user-comment',
        component: UserCommentComponent
      }, 
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
