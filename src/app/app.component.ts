import {Component, OnInit} from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { Router } from "@angular/router";
import { SharedPropertiesService } from "./shared/services/shared-properties.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showHeaderSection:boolean = false;
  constructor(private update:SwUpdate, private sharedProperties: SharedPropertiesService, private router : Router) {
    this.update.available.subscribe(res =>{
      this.update.activated
    })
  }

  ngOnInit(){
    this.sharedProperties.hideHeaderSection.subscribe(result=>{
      //console.log("login Status",result);
      this.showHeaderSection = result;
      /*this.router.events.subscribe(event => {
        console.log('this is what your looking for ', event);
        if(event['url'] && event['url'].indexOf('home') > -1){
          this.showHeaderSection = false;
        }
      })*/

      if(this.router.url && this.router.url.indexOf('home') > -1){
        this.showHeaderSection = false;
      }
    })


  }

}
