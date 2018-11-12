import { Component, OnInit } from '@angular/core';
import {NewsService} from '../shared/services/news.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-post-view',
  templateUrl: './single-post-view.component.html',
  styleUrls: ['./single-post-view.component.scss']
})
export class SinglePostViewComponent implements OnInit {
  newsData;
  newsPostId:any;
  constructor(
    private newsService : NewsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.newsPostId = params.id
    });

    this.newsService.getLocalNewsById(this.newsPostId).subscribe(result => {
      this.newsData = result;
    });
  }

}
