import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { HOST_URL } from "../config/host.config";
import {Subject} from "rxjs";
import {getResponseURL} from "@angular/http/src/http_utils";
import {SharedPropertiesService} from './shared-properties.service';

const ADMIN_URL: string = "admin/review-news";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(private http: HttpClient, private sharedProperties : SharedPropertiesService) {}
  newsData =  new Subject<any>();

  getAdminReviewNews() {

    return this.http.get(HOST_URL + ADMIN_URL+"&access_toke="+ this.sharedProperties.tokenAuthKey ).subscribe(response =>{
      this.newsData.next(response);
    });
  }

  updateAdminReviewNews(data) {

   delete data.imageChunks;
   delete data.imageFiles;
   let formData = new FormData();
    formData.append('newsDetails', new Blob([JSON.stringify({...data})], {
      type: "application/json"
    }));

    return this.http.put(HOST_URL + ADMIN_URL+ "&access_toke="+ this.sharedProperties.tokenAuthKey ,formData).subscribe(response=>{
      console.log(response);
    });
  }
}
