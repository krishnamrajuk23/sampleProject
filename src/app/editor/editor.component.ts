import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";

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
  constructor(private router:Router, private userService: UserService) { }

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

  editNews(){
    this.router.navigate(['editPost']);
  }

  publishNews(data){
    this.uploadImage = true;
    this.publishData = data;
  }

  getNews(data){

  }

  updatedImageData(event){
    console.log(event);
    this.uploadImage = event.hide;
    if(event.fileUpload){
      let newsText:any = {...this.publishData};
      this.userService.postToPublisher({newsText},event.fileUpload);
    }
  }

}
