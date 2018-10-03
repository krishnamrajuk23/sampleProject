import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { HOST_URL } from "../config/host.config";
import {Subject} from "rxjs";
import {getResponseURL} from "@angular/http/src/http_utils";

const ADMIN_URL: string = "admin/review-news";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(private http: HttpClient) {}
  newsData =  new Subject<any>();

  getAdminReviewNews() {
    return this.http.get(HOST_URL + ADMIN_URL).subscribe(response =>{
      this.newsData.next(response);
    });
  }

  updateAdminReviewNews(data) {

    const formData = new FormData();
    formData.append('newsDetails', new Blob([JSON.stringify({...data})], {
      type: "application/json"
    }));
    return this.http.put(HOST_URL + ADMIN_URL,formData).subscribe(response=>{
      console.log(response);
    });
  }
}
