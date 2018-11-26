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
  constructor(private http: HttpClient, private sharedProperties : SharedPropertiesService) {
    this.sharedProperties.accessToken$.subscribe(result => {
      this.sharedProperties.tokenAuthKey = result
    });
  }
  newsData =  new Subject<any>();

  getAdminReviewNews() {
    return this.http.get(HOST_URL + ADMIN_URL+"?access_token="+ this.sharedProperties.tokenAuthKey ).subscribe(response =>{
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

    return this.http.put(HOST_URL + ADMIN_URL+ "?access_token="+ this.sharedProperties.tokenAuthKey ,formData).subscribe(response=>{
      console.log(response);
    });
  }

  createChannels(payload){
    /*
    * publicChannel : false -  private channel creation
    * publicChannel : true - Public channel creation
    * */
    this.http.post(HOST_URL + "admin/channel?access_token="+this.sharedProperties.tokenAuthKey ,payload).subscribe((result)=>{
      console.log(result);
    });
  }

  getUsersListByName(name){
    return this.http.get(HOST_URL + "admin/users?search="+ name +"access_token="+this.sharedProperties.tokenAuthKey);
  }
  getUsersAllList(){
    return this.http.get(HOST_URL + "admin/users?access_token="+this.sharedProperties.tokenAuthKey);
  }

  createPaidUser(userId){
    this.http.post(HOST_URL + `admin/paid-user/${userId}?access_token=`+this.sharedProperties.tokenAuthKey,null).subscribe((result)=>{
      console.log(result);
    });
  }

  getPaidUser(name){
    this.http.get(HOST_URL + `admin/paid-user/search=${name}?access_token=`+this.sharedProperties.tokenAuthKey).subscribe((result)=>{
      console.log(result);
    });
  }

}
