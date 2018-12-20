import { Injectable } from '@angular/core';
import {CanActivate, Router, NavigationEnd} from '@angular/router';
import {SharedPropertiesService} from '../services/shared-properties.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardService implements CanActivate{

  constructor(private router:Router,private sharedService:SharedPropertiesService) { }

  canActivate(){
    this.sharedService.hideHeaderSection.next(false);
      return true;
    }
    //this.router.navigate(['/login']);
}
