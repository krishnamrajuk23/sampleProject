import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*import { CommonModule } from '@angular/common';*/

import {HomeComponent} from './home/home.component';
import { AboutComponent } from './about/about.component';
import {EditorComponent} from "./editor/editor.component";
import {AddPostComponent} from "./editor/add-post/add-post.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'editor', component: EditorComponent },
  { path: 'addPost', component: AddPostComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
