import { Injectable } from "@angular/core";
import { HOST_URL } from "../config/host.config";
import {HttpClient} from "@angular/common/http";
import {LoginDataModal} from '../modal/loginData.modal';

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient) {}

  loginStatus(data) {
    return this.http.post<LoginDataModal>(HOST_URL + "login", data);
  }
}
