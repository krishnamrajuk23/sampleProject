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
  hideHeaderSection = new Subject<boolean>();
  

  constructor() {
    if(sessionStorage.getItem('loginResult')){
      this.loginResponseResult = JSON.parse(sessionStorage.getItem('loginResult'));
      this.loginStatusResponse.next(this.loginResponseResult);
      this.hideHeaderSection.next(false);
    }
    if(sessionStorage.getItem('token')){
      this.tokenAuthKey = sessionStorage.getItem('token');
      this.accessToken$.next(sessionStorage.getItem('token'));
    }
  }

  setLoginStatus(data){
    if(!data){
      sessionStorage.setItem('loginResult',data);
      this.loginStatusResponse.next(new LoginDataModal());
      this.hideHeaderSection.next(false);
    }
    this.loginStatusResponse.next(data.data);
    this.hideHeaderSection.next(false);
    this.loginResponseResult = data.data;
    sessionStorage.setItem('loginResult',JSON.stringify(data.data));
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
