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
  submittedPosts = [];
  adminList = [
    {desc: "Pending", id:1},
    {desc: "Approved",id:2},
    {desc: "Rejected",id:3}];
  selectedAdminList = this.adminList[0];
  constructor(
    private adminService:AdminService,
    private modalService: NgbModal,
    private router: Router,
    private sharedProperty: SharedPropertiesService) { }

  ngOnInit() {
    this.adminService.getAdminReviewNews();
    this.adminService.newsData.subscribe(result =>{
      this.newsposts = result;
       result.data.map(item=>{
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
  declinePost(data,confirmDecline,modal){
    this.modalService.open(confirmDecline, { centered: true });
    modal.close();
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

  selectedList(list){
    console.log(list);
    this.submittedPosts = (list.desc === 'Approved') ? this.approvedPost : this.rejectPost;
  }
  trackByFunc(index,value){
    return value.id;
  }
}
