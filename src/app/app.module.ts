import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxCaptchaModule } from 'ngx-captcha';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { NavComponent } from "./shared/components/nav/nav.component";
import { AppRoutingModule } from "./app-routing.module";
import { AboutComponent } from "./about/about.component";
import { EditorComponent } from "./editor/editor.component";
import { AdminComponent } from "./admin/admin.component";
import { AddPostComponent } from "./editor/add-post/add-post.component";
import { FooterComponent } from "./footer/footer.component";
import { AddLocationComponent } from './admin/add-location/add-location.component';
import { UploadImageComponent } from './editor/upload-image/upload-image.component';
import { EditPostComponent } from './edit-post/edit-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavComponent,
    EditorComponent,
    AdminComponent,
    AboutComponent,
    AddPostComponent,
    FooterComponent,
    AddLocationComponent,
    UploadImageComponent,
    EditPostComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxCaptchaModule,
    ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
