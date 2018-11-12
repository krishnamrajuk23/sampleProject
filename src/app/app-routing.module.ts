import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*import { CommonModule } from '@angular/common';*/

import {HomeComponent} from './home/home.component';
import { AboutComponent } from './about/about.component';
import {EditorComponent} from "./editor/editor.component";
import {AddPostComponent} from "./editor/add-post/add-post.component";
import {AdminComponent} from "./admin/admin.component";
import {AddLocationComponent} from "./admin/add-location/add-location.component";
import {EditPostComponent} from './edit-post/edit-post.component';
import {AuthGuardService} from './shared/services/auth-guard.service';
import {EditorGuardService} from './shared/routeGuards/editor-guard.service';
import {SinglePostViewComponent} from './single-post-view/single-post-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: SinglePostViewComponent},
  { path: 'about', component: AboutComponent },
  { path: 'editor', component: EditorComponent,/*canActivate:[EditorGuardService]*/ },
  { path: 'addPost', component: AddPostComponent },
  { path: 'editPost', component: EditPostComponent},
  { path: 'admin', component: AdminComponent,/* canActivate:[AuthGuardService]*/},
  { path: 'addLocation', component: AddLocationComponent, /*canActivate:[AuthGuardService]*/ },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
