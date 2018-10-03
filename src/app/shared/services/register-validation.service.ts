import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST_URL } from "../config/host.config";

@Injectable({
  providedIn: "root"
})
export class RegisterValidationService {
  constructor(private http: HttpClient) {}

  getValidationFormFields(fieldName, fieldValue) {
    return this.http.get(HOST_URL + `validate-user?${fieldName}=` + fieldValue);
  }
}
