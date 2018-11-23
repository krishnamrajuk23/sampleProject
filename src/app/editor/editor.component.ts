import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SharedPropertiesService} from '../shared/services/shared-properties.service';
import { } from '@types/googlemaps';

declare let google: any;

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

  editorList = [
    {desc: "Draft", id:1},
    {desc: "Pending",id:2},
    {desc: "Approved",id:3},
    {desc: "Rejected",id:4}];

  // google map template reference
  @ViewChild('gmap') gmapElement: any;
  map: any; // google map api object

  selectedEditorList = this.editorList[0];

  constructor(
    private router:Router,
    private userService: UserService,
    private modelService:NgbModal,
    private sharedProperties: SharedPropertiesService) { }

  ngOnInit() {
    // Draft news Data
    this.userService.getDraftNewsByEditorId(); // first time service call on page load
    this.userService.draftNews$.subscribe(result=>{
        this.editorNewsPost = result.data;
    });

    // Published News Data
    this.userService.getPublisherNewById();  // first time service call on page load
    this.userService.publishedNews$.subscribe((result:any)=>{
      result.data.map(item=>{
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

    // google current location tracking
    navigator.geolocation.getCurrentPosition(position => {
      this.showTrackingPosition(position);
    });


  }

  // google current location tracking position
  showTrackingPosition(position){
    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map ? this.map.panTo(location) : null  ;

    let mapProp = {
      center: location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
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
    this.publishData = data;
    this.userService.postToPublisher(data,null);
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

  deleteDraftNews(id){
    this.userService.deleteDraftNewById(id);
  }

  trackFun(index,value){
    return value.id;
  }

}
