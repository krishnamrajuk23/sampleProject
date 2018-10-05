import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NewsService} from '../shared/services/news.service';
import {Md5} from 'ts-md5/dist/md5';
import {LocationsService} from '../shared/services/locations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newsData:any;
  locations:any;
  locationChange:any;
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
    });
  }

  locationChangeEvent(event){
    console.log();
  }

}
