import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NewsService} from '../shared/services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newsData:any;
  constructor(
    private modalService: NgbModal,
    private newsService:NewsService) { }

  ngOnInit() {
    this.newsService.getLocalNews().subscribe(result => {
      this.newsData = result;
    });
  }

}
