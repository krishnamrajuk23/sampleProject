import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SharedPropertiesService} from '../services/shared-properties.service';

@Injectable({
  providedIn: 'root'
})
export class EditorGuardService implements CanActivate{

  constructor(private router:Router,private sharedService:SharedPropertiesService) { }

  canActivate(){
    if(this.sharedService.loginResponseResult){
      return true;
    }
    this.router.navigate(['home']);
  }
}
