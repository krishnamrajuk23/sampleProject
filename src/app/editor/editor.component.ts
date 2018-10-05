import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SharedPropertiesService} from '../shared/services/shared-properties.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  editorNewsPost:any;
  approvedNewsPost:any = [];
  rejectNewsPost:any = [];
  uploadImage:boolean = false;
  publishData : any;
  constructor(
    private router:Router,
    private userService: UserService,
    private modelService:NgbModal,
    private sharedProperties: SharedPropertiesService) { }

  ngOnInit() {
  this.userService.getDraftNewsByEditorId();
  this.userService.draftNews.subscribe(result=>{
      this.editorNewsPost = result;
  });
    this.userService.getPublisherNewById().subscribe((result:any)=>{
      result.map(item=>{
        if(item.status == "A"){
          this.approvedNewsPost.push(item);
        }
        if(item.status == "R"){
          this.rejectNewsPost.push(item);
        }
      });
    });
  }

  addPost(){
    this.router.navigate(['addPost']);
  }

  saveNews(data){
    this.userService.addToDraftNews(data);
  }

  editNews(news){
    this.sharedProperties.setEditPostNews(news);
    this.router.navigate(['editPost']);
  }

  publishNews(data){
    this.uploadImage = true;
    this.publishData = data;
  }

  updatedImageData(event){
    this.uploadImage = event.hide;
    const newsText:any = {...this.publishData};
    if(event.fileUpload){
      this.userService.postToPublisher({newsText},event.fileUpload);
    }else{
      this.userService.postToPublisher({newsText},null);
    }
  }


}
