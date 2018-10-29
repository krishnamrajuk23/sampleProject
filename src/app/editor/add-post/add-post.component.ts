import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from '../../shared/services/user.service';
import {SharedPropertiesService} from '../../shared/services/shared-properties.service';
import {UtilService} from '../../shared/util/util.service';
import {LocationsService} from '../../shared/services/locations.service';

declare let google: any;

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
  selectLocation:any;
  url:any;
  selectedLanguage:any;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private userService: UserService,
    private sharedProperties: SharedPropertiesService,
    private route: ActivatedRoute,
    private util:UtilService,
    private locations:LocationsService) { }

  ngOnInit() {

    // Load the Google Transliterate API
    google.load("elements", "1", {
      packages: "transliteration"
    });



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
      title: ['',Validators.required],
      description: ['',Validators.required],
      newsDate: ['',Validators.required]
    });
  }


  addSavePost(data){
    let newsText:any = {...data.value};
    newsText.editorId = this.sharedProperties.loginResponseResult.userId;
    newsText.location = this.selectLocation ? [this.selectLocation.id] : null;

    this.userService.addToDraftNews({...newsText});
    this.router.navigate(['editor']);

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

  changelanguage(lan) {
    lan = lan.currentTarget[lan.target.selectedIndex].text;

    var options = {
      sourceLanguage:
      google.elements.transliteration.LanguageCode.ENGLISH,
      destinationLanguage:
        [google.elements.transliteration.LanguageCode[lan.toUpperCase()]],
      shortcutKey: 'ctrl+g',
      transliterationEnabled: true
    };

    // Create an instance on TransliterationControl with the required
    // options.
    var control =
      new google.elements.transliteration.TransliterationControl(options);

    // Enable transliteration in the textbox with id
    // 'transliterateTextarea'.
    control.makeTransliteratable(['transliterateTextarea']);
    //control.makeTransliteratable(['title']);

  }



}
