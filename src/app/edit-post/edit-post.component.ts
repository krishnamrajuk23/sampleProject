import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SharedPropertiesService} from '../shared/services/shared-properties.service';
import {LocationsService} from '../shared/services/locations.service';
import {UserService} from '../shared/services/user.service';
import {Router} from '@angular/router';
import {UtilService} from '../shared/util/util.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  editPostForm: FormGroup;
  locationsData:any;
  /*uploadImage:any;
  publishData:any;*/
  editPostData:any;
  constructor(
    private fb:FormBuilder,
    private sharedProperties:SharedPropertiesService,
    private locations:LocationsService,
    private userService: UserService,
    private router: Router,
    private util: UtilService) { }

  ngOnInit() {
    this.editPostData = this.sharedProperties.editPostNews;
    if(!this.editPostData){
      (this.sharedProperties.loginResponseResult.approver) ? this.router.navigate(['admin']) : this.router.navigate(['editor']);
    }
    this.editPostForm = this.fb.group({
      title: [this.editPostData.title],
      description: [this.editPostData.description],
      location: [''],
      newsDate: [this.editPostData.newsDate],
      refLink: [this.editPostData.refLink]
    });
    this.locations.getLocations().subscribe(response => {
      this.locationsData = response;
    });
  }

  updateSavePost(data){
    let newsText:any = {...data.value};

    newsText.editorId = this.sharedProperties.loginResponseResult.userId;
    newsText.location = [data.value.location.id];
    newsText.id = this.editPostData.id;

    this.userService.updateDraftNews({...newsText});
    (this.sharedProperties.loginResponseResult.approver) ? this.router.navigate(['admin']) : this.router.navigate(['editor']);
  }
 /* addPost(data){
    this.publishData = {...data.value};
    this.uploadImage = true;
  }*/

 /* updatedImageData(event){
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
    (this.sharedProperties.loginResponseResult.approver) ? this.router.navigate(['admin']) : this.router.navigate(['editor']);
  }*/


}
