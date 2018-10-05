import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit,AfterViewInit {
  @Output() sendValue = new EventEmitter<any>();
  @Output() hide = new EventEmitter();
  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperReady = false;
  constructor(
  ) { }
  @ViewChild('content') content;
  ngOnInit() {

  }
  ngAfterViewInit(){

  }
  saveImage(){
    this.sendValue.emit({fileUpload:this.imageChangedEvent, hide: false});
  }

  skip(){
    this.sendValue.emit({fileUpload:null, hide: false});
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCroppedBase64(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    this.cropperReady = true;
  }
  loadImageFailed () {
    console.log('Load failed');
  }

}
