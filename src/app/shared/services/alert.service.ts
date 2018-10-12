import { Injectable } from '@angular/core';
import { Subject } from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertState = new Subject<any>();

  constructor() {
  }

  showAlert(status){
    this.alertState.next({show: true,...status});
    this.autoClose();
  }
  hideAlert(status){
    this.alertState.next({show: false,...status});
    this.autoClose();
  }

  autoClose(){
    setTimeout(()=>{
      this.alertState.next({show:false})
    },10000);
  }

}
