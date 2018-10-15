import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SharedPropertiesService} from './shared-properties.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private sharedProperty: SharedPropertiesService,
    private router: Router) { }

  canActivate(){
    if(this.sharedProperty.loginResponseResult.approver){
      return true;
    }
    this.router.navigate(['home']);
  }

}