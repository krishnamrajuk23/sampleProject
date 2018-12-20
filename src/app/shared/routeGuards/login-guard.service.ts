import { Injectable } from '@angular/core';
import {CanActivate, Router, NavigationEnd} from '@angular/router';
import {SharedPropertiesService} from '../services/shared-properties.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  constructor(private router:Router,private sharedService:SharedPropertiesService) { }

  canActivate(){
    if(this.sharedService.loginResponseResult){
      this.router.navigate(['/home']);
      return false;
    }else{
      this.router.events.subscribe(event => {
        if((event['url'] && event['url'].indexOf('login') || event['url'] && event['url'].indexOf('register')) > -1){
          this.sharedService.hideHeaderSection.next(true);
        }
      });
      return true;
    }
    //this.router.navigate(['/login']);
  }
}
