import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SharedPropertiesService} from '../shared/services/shared-properties.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  editPostForm: FormGroup;
  constructor(
    private fb:FormBuilder,
    private sharedProperties:SharedPropertiesService) { }

  ngOnInit() {
    this.editPostFormFields();
    this.sharedProperties.editPostNews.subscribe(result=>{
      console.log(this.editPostForm);
      this.editPostForm.patchValue({
        title: result.title,
        description: result.description,
        location: result.location,
        newsDate: result.newsDate,
        refLink: result.refLink
      })
    });
  }

  editPostFormFields(){
    this.editPostForm = this.fb.group({
      title:[''],
      description:[''],
      location:[''],
      newsDate:[''],
      refLink:['']
    });
  }
}
