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
      this.newsData = result.data ? result.data : [];
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
    console.log(address.geometry.location.toJSON());
    /*this.lng = address.geometry.location.lng();
    this.lat  = address.geometry.location.lat();*/
  }

  subscriptionChannel(channelId){
    this.channelService.subscribeChannel(channelId).subscribe(
      (response)=>{
      console.log(response);
    },(error)=>{this.sharedProperties.setRegistrationRequired(true)});
  }
}
