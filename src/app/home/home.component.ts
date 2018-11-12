import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NewsService} from '../shared/services/news.service';
import {LocationsService} from '../shared/services/locations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newsData:any;
  locations:any;
  ShowFilter = false;
  selectedItems: Array<any> = [];
  dropdownSettings: any = {};
  localurl = location.href;
  constructor(
    private modalService: NgbModal,
    private newsService:NewsService,
    private locationService: LocationsService) { }

  ngOnInit() {
    this.newsService.getLocalNews().subscribe(result => {
      this.newsData = result;
    });
    this.locationService.getLocations().subscribe(locations=>{
      this.locations = locations;
      this.selectedItems = [];
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
}
