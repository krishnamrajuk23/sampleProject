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

  setEditPostNews(news){
    this.editPostNews = news;
  }

  setAccessToken(token){
    this.accessToken$.next(token);
  }

}
