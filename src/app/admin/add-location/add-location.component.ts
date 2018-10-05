import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  addLocationForm : FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addLocationDetails();
  }
  addLocationDetails(){
    this.addLocationForm = this.fb.group({
      location:[''],
      desc:[''],
      state:['']
    });
  }
  addLocation(locData){
    let locdata:any = {...locData.value};
  }

}
