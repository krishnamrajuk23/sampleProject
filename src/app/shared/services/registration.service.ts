import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST_URL } from "../config/host.config";

@Injectable({
  providedIn: "root"
})
export class RegistrationService {
  registerStatus = false ;
  constructor(private http: HttpClient) {}

  addRegistrationDetails(data) {
    return this.http.post(HOST_URL + "signup",data).subscribe(response=>{
      console.log("response",response);
      this.registerStatus = true;
    },(error) => {
        this.registerStatus = false;
      });
  }
}
