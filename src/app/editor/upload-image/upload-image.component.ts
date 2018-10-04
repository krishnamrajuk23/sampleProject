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
  selectedImage:any;
  constructor(
    private modalService: NgbModal,
  ) { }
  @ViewChild('content') content;
  ngOnInit() {

  }
  ngAfterViewInit(){
    this.modalService.open(this.content, { centered: true });
  }
  saveImage(){
    this.sendValue.emit({fileUpload:this.selectedImage, hide: false});
  }

  onFileUpload(event){
    this.selectedImage = event.target.files[0];
  }

  skip(){
    this.sendValue.emit({fileUpload:null, hide: false});
  }

}
