import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from '../../shared/services/user.service';
import {SharedPropertiesService} from '../../shared/services/shared-properties.service';
import {UtilService} from '../../shared/util/util.service';
import {LocationsService} from '../../shared/services/locations.service';
import {ChannelService} from "../../shared/services/channel.service";
import { AdminService } from '../../shared/services/admin.service';

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
  selectChannel:any;
  channelData: any;
  location:any;
  url:any;
  selectedLanguage:any;
  channel:any;
  currentLocation:any;
  language:any = 'en';
  approversData:any;
  selectApprover:any;
  private controlLanguageTranslation:any;
  userSettings: any = {
    inputPlaceholderText: 'This is the placeholder text during component initialization'
  }




  constructor(
    private fb: FormBuilder,
    private router:Router,
    private userService: UserService,
    private sharedProperties: SharedPropertiesService,
    private route: ActivatedRoute,
    private util:UtilService,
    private locations:LocationsService,
    private channelService: ChannelService,
    private adminService:AdminService) {

      /*setTimeout(()=>{
        this.userSettings['inputPlaceholderText'] = 'This is the placeholder text after doing some external operation after some time';
        this.userSettings = Object.assign({},this.userSettings)
      },10000)*/
     }


  ngOnInit() {
    /*// Load the Google Transliterate API
    google.load("elements", "1", {
      packages: "transliteration"
    });
*/
    this.editorFormDetails();

    this.channelService.subscribeChannelList().subscribe((response:any)=>{
      this.channelData = response.data;
    });

    this.adminService.getPaidUser().subscribe((response:any)=>{
      this.approversData = response.data;
    })

  }

  editorFormDetails() {
    this.editorForm = this.fb.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
      newsDate: ['',Validators.required],
    });
  }


  addSavePost(data){
    let newsText:any = {...data.value};
    newsText.editorId = this.sharedProperties.loginResponseResult.userId;
    newsText.currentLocation =  {lat:17.387140,lng:78.491684};
    newsText.channel = this.channel;
    newsText.language = this.language;
    newsText.location = this.location ? this.location : [{lat:17.387140,lng:78.491684}];

    this.userService.addToDraftNews({...newsText});
    this.router.navigate(['editor']);

  }

  addPost(data){
    if(data.valid){
      this.publishData = {...data.value};

      this.publishData.editorId = this.sharedProperties.loginResponseResult.userId;
      this.publishData.currentLocation = this.currentLocation ?  this.currentLocation : {lat:17.387140,lng:78.491684};
      this.publishData.channel = this.channel;
      this.publishData.language = this.language;
      this.publishData.location = this.location ? this.location : [{lat:17.387140,lng:78.491684}];

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
      sourceLanguage:'en',
      destinationLanguage:
        [google.elements.transliteration.LanguageCode[lan.toUpperCase()]],
      shortcutKey: 'ctrl+g',
      transliterationEnabled: true
    };

    // Create an instance on TransliterationControl with the required
    // options.
    this.controlLanguageTranslation =
      new google.elements.transliteration.TransliterationControl(options);

    // Enable transliteration in the textbox with id
    // 'transliterateTextarea'.
    this.controlLanguageTranslation.makeTransliteratable(['transliterateTextarea']);
    this.controlLanguageTranslation.makeTransliteratable(['title']);
    //control.makeTransliteratable(['title']);

  }

  // description(name){
  //   this.controlLanguageTranslation.makeTransliteratable([name]);
  // }

  public handleAddressChange(address,editFormData) {
    console.log(address.geometry.location.toJSON());
    this.location = [{lat:17.387140,lng:78.491684}];
    /*this.lng = address.geometry.location.lng();
    this.lat  = address.geometry.location.lat();*/
  }

  findMe(){
    console.log("clicked");
    this.currentLocation = {lat:17.387140,lng:78.491684};
    navigator.geolocation.getCurrentPosition((position) => {
      this.showPosition(position);
    });
  }

  showPosition(position) {
    let geoLocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': geoLocate}, function (results, status) {
      console.log("geocode",results)
    });
  }

  selectChannelObj(selectChannel){
    console.log("selectChannel",selectChannel);
    this.channel = selectChannel.id;
    if(Array.isArray(selectChannel.approvers)){
      this.selectApprover = this.approversData.filter(item=>{
        return item.userId === selectChannel.approvers[0];
      })[0];
    }
  }

  cancel(){
    this.router.navigate(['editor']);
  }
  approverSelection(event){
    console.log("Event ",event);
  }

  autoCompleteCallback1(event){
    if(event){
      this.location = [event.data.geometry.location];
    }
    
  }

}
