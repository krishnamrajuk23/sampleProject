import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from '../../shared/services/user.service';
import {SharedPropertiesService} from '../../shared/services/shared-properties.service';
import {UtilService} from '../../shared/util/util.service';
import {LocationsService} from '../../shared/services/locations.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  editorForm: FormGroup;
  uploadImage:boolean = false;
  publishData:any;
  locationsData:any;
  selectLocation:any ={};
  url:any;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private userService: UserService,
    private sharedProperties: SharedPropertiesService,
    private route: ActivatedRoute,
    private util:UtilService,
    private locations:LocationsService) { }

  ngOnInit() {
    this.route.params.subscribe((param)=>{
      console.log("active route",param)
    });
    this.editorFormDetails();
    this.locations.getLocations().subscribe(response => {
      this.locationsData = response;
    });
  }

  editorFormDetails() {
    this.editorForm = this.fb.group({
      title: [''],
      description: [''],
      newsDate: [''],
      imageUpload:['']
    });
  }


  addSavePost(data){
    let newsText:any = {...data.value};

    newsText.editorId = this.sharedProperties.loginResponseResult.userId;
    newsText.location = [data.value.location.id];

    this.userService.addToDraftNews({...newsText});
    this.router.navigate(['editor']);

  }

  addPost(data){
    this.publishData = {...data.value};
    this.uploadImage = true;
  }

  updatedImageData(event){
    this.uploadImage = event.hide;
    const newsText:any = {...this.publishData};

    newsText.editorId = this.sharedProperties.loginResponseResult.userId;
    newsText.location = [newsText.location.id];

    if(event.fileUpload){
      let fileObject:any;
       this.util.setFileData(event.fileUpload.target.files[0]);
      fileObject = this.util.dataURLtoFile(event.cropped);
      this.userService.postToPublisher({newsText},fileObject);
    }else{
      this.userService.postToPublisher({newsText},null);
    }
    this.router.navigate(['editor']);
  }

  fileChangeEvent(event){
    this.url = this.util.showImagePreview(event);
  }

}
