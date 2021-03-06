import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'tweet',
  template: `<a class="dark-font" href="https://twitter.com/share" [attr.data-text]="text" [attr.data-url]="url"><i class="fa fa-twitter"></i></a>`
})

export class TwitterShareComponent implements AfterViewInit {
  @Input() url  ;
  @Input() text = '';

  constructor() {
    // load twitter sdk if required
    const url = 'https://platform.twitter.com/widgets.js';
    if (!document.querySelector(`script[src='${url}']`)) {
      let script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);
    }
  }

  ngAfterViewInit(): void {
    // render tweet button
    window['twttr'] && window['twttr'].widgets.load();
  }

}
