import { Injectable } from '@angular/core';
import {ActivatedRoute, CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import {SharedPropertiesService} from './shared-properties.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private sharedProperty: SharedPropertiesService,
    private router: Router,
    private  snapshot: ActivatedRouteSnapshot) { }

  canActivate(){
    console.log("active",this.snapshot);
    if(this.sharedProperty.loginResponseResult.approver){
      return true;
    }
    this.router.navigate(['home']);
  }

}
