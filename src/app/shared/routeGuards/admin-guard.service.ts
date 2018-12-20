import { Injectable } from '@angular/core';
import {CanActivate, Router, NavigationEnd} from '@angular/router';
import {SharedPropertiesService} from '../services/shared-properties.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  constructor(private router:Router,private sharedService:SharedPropertiesService) { }

  canActivate(){
    const checkRoleType = this.sharedService.loginResponseResult.roles.indexOf("ROLE_ADMIN") > -1 || this.sharedService.loginResponseResult.roles.indexOf("ROLE_PUSER1") > -1;
    if(this.sharedService.loginResponseResult && checkRoleType ){
      return true;
    }
    this.router.navigate(['/home']);
  }
}
