import { Component, OnInit } from '@angular/core';
import {AdminService} from "../shared/services/admin.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";
import {SharedPropertiesService} from '../shared/services/shared-properties.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  newsposts:any;
  approvedPost = [];
  rejectPost = [];
  page = 1;
  selectedPost;

  constructor(
    private adminService:AdminService,
    private modalService: NgbModal,
    private router: Router,
    private sharedProperty: SharedPropertiesService) { }

  ngOnInit() {
    this.adminService.getAdminReviewNews();
    this.adminService.newsData.subscribe(result =>{
      this.newsposts = result;
       result.map(item=>{
        if(item.status == "A"){
          this.approvedPost.push(item);
        }else if(item.status == "R"){
          this.rejectPost.push(item);
        }
      });
    });
  }
  editpost(modal){
    this.router.navigate(['addPost']);
    modal.close();
  }
  approvePost(data,modal){
    data.status = "A";
    data.reviewerId = this.sharedProperty.loginResponseResult.userId;
    this.adminService.updateAdminReviewNews(data);
    modal.close();
  }
  declinePost(confirmDecline){
    this.modalService.open(confirmDecline, { centered: true });
  }
  declineConfirm(modal,data){
    data.status = "R";
    data.reviewerId = this.sharedProperty.loginResponseResult.userId;
    this.adminService.updateAdminReviewNews(data);
    modal.close();
  }
  viewPost(showModal,data){
    this.selectedPost = data;
    this.modalService.open(showModal, { centered: true });
  }
  trackByFunc(index,value){
    return value.id;
  }
}
