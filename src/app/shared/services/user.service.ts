import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { HOST_URL } from "../config/host.config";
import {Subject} from 'rxjs';
import {SharedPropertiesService} from './shared-properties.service';

@Injectable({
  providedIn: "root"
})
export class UserService {
  draftNews = new Subject<any>();
  userObject:any;
  constructor(private http: HttpClient,private sharedProperties:SharedPropertiesService) {
    this.userObject = this.sharedProperties.loginResponseResult;
  }

  addToDraftNews(data) {
    return this.http.post(HOST_URL + "user/draft-news", data).subscribe(response=>{
      this.draftNews.next(response);
    });
  }

  updateDraftNews(data) {
    return this.http.put(HOST_URL + "user/draft-news", data).subscribe(response=>{
      this.draftNews.next(response);
    });
  }

  getDraftNewsByEditorId() {
    this.http.get(HOST_URL + "user/draft-news/" + this.userObject.userId).subscribe(response=>{
      this.draftNews.next(response);
    });
  }

  postToPublisher(data) {
    const headers = new HttpHeaders();

    const formData = new FormData();
    formData.append('newsDetails', new Blob([JSON.stringify({...data.newsText})], {
      type: "application/json"
    }));

    this.http.post(HOST_URL + "user/publish-news", formData, {headers:headers}).subscribe(response=>{
      this.getDraftNewsByEditorId();
    });
  }

  getPublisherNewById() {
    return this.http.get(HOST_URL + "user/publish-news/" + this.userObject.userId);
  }
}
