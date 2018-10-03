import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {LoginDataModal} from '../modal/loginData.modal';

@Injectable({
  providedIn: 'root'
})
export class SharedPropertiesService {
  loginResponseResult: LoginDataModal;
  loginStatusResponse =  new Subject<LoginDataModal>();
  constructor() {
    if(sessionStorage.getItem('loginResult')){
      this.loginResponseResult = JSON.parse(sessionStorage.getItem('loginResult'));
    }
  }


  setLoginStatus(data){
    this.loginStatusResponse.next(data);
    this.loginResponseResult = data;
    sessionStorage.setItem('loginResult',JSON.stringify(data));
  }
}
