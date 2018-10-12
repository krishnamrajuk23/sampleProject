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
  /*uploadImage:any;*/
  publishData:any;
  editPostData:any;
  selectLocation:any;
  url:any;
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
    newsText.location = this.selectLocation ? [this.selectLocation.id] : null;
    newsText.id = this.editPostData.id;

    this.userService.updateDraftNews({...newsText});
    (this.sharedProperties.loginResponseResult.approver) ? this.router.navigate(['admin']) : this.router.navigate(['editor']);
  }

  fileChangeEvent(event){
    if (event.target.files && event.target.files[0]) {
      this.util.setFileData(event.target.files[0]);
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      };
    }
  }

 addPost(data){
    if(data.valid){
      this.publishData = {...data.value};

      this.publishData.editorId = this.sharedProperties.loginResponseResult.userId;
      this.publishData.location = [this.selectLocation.id];
      if(this.url){
        const fileObject = this.util.dataURLtoFile(this.url);
        this.userService.postToPublisher({...this.publishData},fileObject);
      }else{
        this.userService.postToPublisher({...this.publishData},null);
      }
      this.router.navigate(['editor']);
    }
  }
}
