import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewsService} from '../shared/services/news.service';
import {LocationsService} from '../shared/services/locations.service';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import { ChannelService } from '../shared/services/channel.service';
import { Router } from '../../../node_modules/@types/express';
import { SharedPropertiesService } from '../shared/services/shared-properties.service';

declare var google:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newsData:any;
  locations:any = [];
  ShowFilter = false;
  selectedItems: Array<any> = [];
  dropdownSettings: any = {};
  localurl = location.href;
  address:any;
  subscribedChannelList : any[] = [];
  showChannelNews : boolean = false;
  channelNewsData: any[] = [];

  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('search' ) public searchElement: ElementRef;

  constructor(
    private modalService: NgbModal,
    private newsService:NewsService,
    private locationService: LocationsService,
    private channelService: ChannelService,
    private sharedProperties: SharedPropertiesService) { }

  ngOnInit() {
    this.newsService.getLocalNews().subscribe((result:any) => {
      let newsData = [];
      newsData = result.data ? result.data : [];
      this.channelService.getSubscribeChannel().subscribe((res:any)=>{
        this.subscribedChannelList = res.data;
        this.subscribedChannelList.map(list=>{
          if(!list.publicChannel){
            newsData = newsData.map(item=>{
              if(item.channel){
                item.isSubscribed = true;
              }
              return item;
            });
          }
        });
        this.newsData = newsData.sort((first,second) =>{
          return +new Date(second.newsDate) - (+new Date(first.newsDate));
        });
      });
      this.newsData = this.newsData ? this.newsData : newsData;
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'location',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
    };

    let locationObj = '['+JSON.stringify({'lat':17.385044,'lng':78.486671})+']';

    this.locationService.getLocations(locationObj).subscribe(response=>{
      console.log("Location result", response);
    });


  }

  filterByLocationData(selectLocation:string){
    this.newsService.getLocalNewsByLocation(selectLocation).subscribe(result => {
      this.newsData = result;
    });
  }

  onItemSelect(item:any){
    this.selectedItems.push(item.id);
    this.filterByLocationData(this.selectedItems.join());

  }

  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  onDeSelectItem(item) {
    console.log('on De select', item);
    this.selectedItems = this.selectedItems.filter(select => {
      if(select !== item.id){
        return item.id;
      }
    });
    this.filterByLocationData(this.selectedItems.join());
  }

  // Share data on whatsapp
  getLinkWhatsapp(number, message) {
    message = message.split(' ').join('%20');
    window.open('https://api.whatsapp.com/send?phone=' + '' + '&text=%20' + message,'_blank');
  }

  trackByFn(index, loc) {
    return loc.id;
  }

  public handleAddressChange(address) {

    let loc = address.geometry.location.toJSON();
    let locationObj = [];
    locationObj.push(JSON.stringify({lat:loc.lat,lng:loc.lng}));

    this.locationService.getLocations(locationObj).subscribe(response=>{
      console.log("Location result", response);
    });

    /*this.lng = address.geometry.location.lng();
    this.lat  = address.geometry.location.lat();*/
  }

  subscriptionChannel(channelId,news){
    /* If isSubscribe is false make channel as subscribe through service call
    * else subscribe channel to unsubscribe channel for the user
    **/
    if(!news.isSubscribed){
      this.channelService.subscribeChannel(channelId).subscribe(
        (response)=>{
          news.isSubscribed = true;
        },(error)=>{
        this.sharedProperties.setRegistrationRequired(true)
      });
    }else{
      this.channelService.unsubscribeChannel(channelId).subscribe(
        (response)=>{
          news.isSubscribed = false;
        });
    }
  }

  openChannelNews(channelId){
    this.showChannelNews = true;
    this.newsService.getChannelNewsById(channelId).subscribe((res:any)=>{
      this.channelNewsData = res.data;
    });
  }


}
