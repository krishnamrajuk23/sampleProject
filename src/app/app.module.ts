import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxCaptchaModule } from 'ngx-captcha';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


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
import { LoaderComponent } from './loader/loader.component';
import { MultiselectComponent } from './core/multiselect/multiselect.component';
import { LoaderInterceptorService } from './shared/services/loader-interceptor.service';
import {AppInterceptor} from "./app.interceptor";
import { AlertComponent } from './shared/components/alert/alert.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TwitterShareComponent } from './shared/components/twitter-share/twitter-share.component';
import { SearchComponent } from './admin/search/search.component';
import { SinglePostViewComponent } from './single-post-view/single-post-view.component';
import { GooglePlacesDirective } from './shared/directives/google-places.directive';



import { GooglePlaceModule } from "ngx-google-places-autocomplete";

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
    EditPostComponent,
    LoaderComponent,
    MultiselectComponent,
    AlertComponent,
    TwitterShareComponent,
    SearchComponent,
    SinglePostViewComponent,
    GooglePlacesDirective
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxCaptchaModule,
    ImageCropperModule,
    NgMultiSelectDropDownModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    GooglePlaceModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
