import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*import { CommonModule } from '@angular/common';*/

import {HomeComponent} from './home/home.component';
import { AboutComponent } from './about/about.component';
import {EditorComponent} from "./editor/editor.component";
import {AddPostComponent} from "./editor/add-post/add-post.component";
import {AdminComponent} from "./admin/admin.component";
import {AddChannelComponent} from "./admin/add-channel/add-channel.component";
import {EditPostComponent} from './edit-post/edit-post.component';
import {AuthGuardService} from './shared/services/auth-guard.service';
import {EditorGuardService} from './shared/routeGuards/editor-guard.service';
import {SinglePostViewComponent} from './single-post-view/single-post-view.component';
import {SearchComponent} from './admin/search/search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginGuardService } from './shared/routeGuards/login-guard.service';
import { HomeGuardService } from './shared/routeGuards/home-guard.service';
import { AdminGuardService } from './shared/routeGuards/admin-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate:[HomeGuardService] },
  { path: 'login', component: LoginComponent, canActivate:[LoginGuardService] },
  { path: 'register', component: RegisterComponent, canActivate:[LoginGuardService] },
  { path: 'home/:id', component: SinglePostViewComponent},
  { path: 'about', component: AboutComponent },
  { path: 'editor', component: EditorComponent,canActivate:[EditorGuardService] },
  { path: 'addPost', component: AddPostComponent,canActivate:[EditorGuardService]  },
  { path: 'editPost', component: EditPostComponent,canActivate:[EditorGuardService] },
  { path: 'admin', component: AdminComponent, canActivate:[AdminGuardService]},
  { path: 'addChannel', component: AddChannelComponent, canActivate:[AuthGuardService] },
  { path: 'searchUsers', component: SearchComponent, canActivate:[AuthGuardService] },
  { path: 'approveNews', component: SearchComponent, /*canActivate:[AuthGuardService]*/ },
  { path: '**',component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
