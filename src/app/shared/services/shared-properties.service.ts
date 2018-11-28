import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {LoginDataModal} from '../modal/loginData.modal';
import {NewsModal} from '../modal/news.modal';

@Injectable({
  providedIn: 'root'
})
export class SharedPropertiesService {
  loginResponseResult: LoginDataModal;
  loginStatusResponse =  new Subject<LoginDataModal>();
  editPostNews : NewsModal;
  accessToken$ = new Subject<string>();
  tokenAuthKey : string;
  registrationRequired = new Subject<boolean>();

  constructor() {
    if(sessionStorage.getItem('loginResult')){
      this.loginResponseResult = JSON.parse(sessionStorage.getItem('loginResult'));
    }
    if(sessionStorage.getItem('token')){
      this.tokenAuthKey = sessionStorage.getItem('token');
      this.accessToken$.next(sessionStorage.getItem('token'));
    }
  }

  setLoginStatus(data){
    this.loginStatusResponse.next(data);
    this.loginResponseResult = data;
    sessionStorage.setItem('loginResult',JSON.stringify(data));
  }

  setEditPostNews(news){
    this.editPostNews = news;
  }

  setAccessToken(token){
    this.accessToken$.next(token);
    sessionStorage.setItem('token',token);
  }

  setRegistrationRequired(flag){
    this.registrationRequired.next(flag);
  }

}
