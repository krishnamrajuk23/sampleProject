import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { HOST_URL } from "../config/host.config";
import {Subject} from 'rxjs';
import {SharedPropertiesService} from './shared-properties.service';

@Injectable({
  providedIn: "root"
})
export class UserService {
  draftNews$ = new Subject<any>();
  publishedNews$ = new Subject<any>();
  userObject:any;
  constructor(private http: HttpClient,private sharedProperties:SharedPropertiesService) {
    this.userObject = this.sharedProperties.loginResponseResult;
  }

  addToDraftNews(data) {
    this.http.post(HOST_URL + "user/draft-news", data).subscribe(response=>{
      console.log("drafts",response);
      this.getDraftNewsByEditorId();
    },(error)=>{
      this.getDraftNewsByEditorId();
    });
  }

  updateDraftNews(data) {
    this.http.put(HOST_URL + "user/draft-news", data).subscribe(response=>{
      this.getDraftNewsByEditorId();
    },(error)=>{
      console.log("updated draft news",error);
      this.getDraftNewsByEditorId();
      this.getPublisherNewById();
    });
  }

  getDraftNewsByEditorId() {
    this.http.get(HOST_URL + "user/draft-news/" + this.userObject.userId).subscribe(response=>{
      this.draftNews$.next(response);
    })
  }

  postToPublisher(data,file) {
    const headers = new HttpHeaders();

    const formData = new FormData();
    formData.append('newsDetails', new Blob([JSON.stringify({...data})], {
      type: "application/json"
    }));
    if(file){
      formData.append('newsImage',file);
    }

    this.http.post(HOST_URL + "user/publish-news", formData, {headers:headers}).subscribe(response=>{
      this.getDraftNewsByEditorId();
      this.getPublisherNewById();
    },(error)=>{
      console.log("publish news",error);
      this.getDraftNewsByEditorId();
      this.getPublisherNewById();
    });
  }

  getPublisherNewById() {
    this.http.get(HOST_URL + "user/publish-news/" + this.userObject.userId).subscribe(response=>{
      this.publishedNews$.next(response);
    });
  }
}
