import { Component, OnInit } from '@angular/core';
import { AlertService } from "../../services/alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit {
  alert:any = {
    show:false
  };
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.alertState.subscribe(alertState=>{
      this.alert = alertState;
    });
  }

  close(){
    this.alertService.alertState.next({show:false});
  }
}
