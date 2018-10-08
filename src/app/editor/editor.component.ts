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
  pendingNewsPost:any = [];
  uploadImage:boolean = false;
  publishData : any;
  constructor(
    private router:Router,
    private userService: UserService,
    private modelService:NgbModal,
    private sharedProperties: SharedPropertiesService) { }

  ngOnInit() {
    // Draft news Data
    this.userService.getDraftNewsByEditorId(); // first time service call on page load
    this.userService.draftNews$.subscribe(result=>{
        this.editorNewsPost = result;
    });

    // Published News Data
    this.userService.getPublisherNewById();  // first time service call on page load
    this.userService.publishedNews$.subscribe((result:any)=>{
      result.map(item=>{
        if(item.status == "A"){
          this.approvedNewsPost.push(item);
        }
        if(item.status == "R"){
          this.rejectNewsPost.push(item);
        }
        if(item.status === null){
          this.pendingNewsPost.push(item);
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

  trackFun(index,value){
    return value.id;
  }

}
