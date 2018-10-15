import { Injectable } from "@angular/core";
import { HOST_URL } from "../config/host.config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginDataModal} from '../modal/loginData.modal';

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient) {}

  loginStatus(data) {
    return this.http.post<LoginDataModal>(HOST_URL + "login", data);
  }


  authToken(credentionals){
    let header = new HttpHeaders();
    header = header.set('Authorization','Basic ' + btoa('client'+':'+'secret'));
    header = header.append('Content-Type','application/x-www-form-urlencoded');
    return this.http.post(HOST_URL+`oauth/token?grant_type=password&username=${credentionals.userId}` + "&password="+credentionals.password,null,{headers: header}).subscribe(response=>{
      console.log(response);
    });

  }
}
