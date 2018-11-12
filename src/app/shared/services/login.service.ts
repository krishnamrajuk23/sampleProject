import { Injectable } from "@angular/core";
import { HOST_URL } from "../config/host.config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginDataModal} from '../modal/loginData.modal';
import {SharedPropertiesService} from './shared-properties.service';

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient,private sharedService: SharedPropertiesService) {}

  loginStatus(data) {
    this.authToken(data);
    if(this.sharedService.accessToken$){
      this.sharedService.accessToken$.subscribe(result=>{
        if(typeof (result) === 'string' && result){
          return this.http.post<LoginDataModal>(HOST_URL + "user/user-details?access_token=", result).subscribe(response=>{
            this.sharedService.setLoginStatus(response);
          });
        }
      });
    }
  }


  authToken(credentionals){
    let username: string = 'client',
        password: string = 'secret',
        header = new HttpHeaders();
    header = header.append('Authorization','Basic ' + btoa(username+':'+password));
    header = header.append('Content-Type','application/x-www-form-urlencoded;charset=utf-8');

    this.http.post(HOST_URL+`oauth/token?grant_type=password&username=${credentionals.userId}` + "&password="+credentionals.password,"",
      { headers: header }).subscribe((response:any)=>{
        this.sharedService.setAccessToken(response.access_token);
    });
  }


}
