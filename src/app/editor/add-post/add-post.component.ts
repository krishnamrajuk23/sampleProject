import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from '../../shared/services/user.service';
import {SharedPropertiesService} from '../../shared/services/shared-properties.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  editorForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private userService: UserService,
    private sharedProperties: SharedPropertiesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((param)=>{
      console.log("active route",param)
    });
    this.editorFormDetails();
  }

  editorFormDetails(){
    this.editorForm = this.fb.group({
      title:[''],
      description:[''],
      location:[''],
      newsDate:[''],
      refLink:['']
    })
  }

  onSubmit(){
    this.router.navigate(['editor']);
  }

  addSavePost(data){
    let newsText:any = {...data.value};

    newsText.editorId = this.sharedProperties.loginResponseResult.userId;
    newsText.location = [data.value.location];

    this.userService.addToDraftNews({...newsText});
    this.router.navigate(['editor']);
  }

  addPost(data){
    let newsText:any = {...data.value};

    newsText.editorId = this.sharedProperties.loginResponseResult.userId;
    newsText.publishedBy = this.sharedProperties.loginResponseResult.name;
    newsText.imageFiles = [];
    newsText.imageChunks = [];
    newsText.location = [data.value.location];

    this.userService.postToPublisher({newsText: newsText},null);

  }

}
