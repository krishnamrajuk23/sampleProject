import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocationsService} from '../../shared/services/locations.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  addLocationForm : FormGroup;
  statesList:any;
  constructor(
    private fb: FormBuilder,
    private locationsService:LocationsService) { }

  ngOnInit() {
    this.addLocationDetails();
    this.locationsService.getStates().subscribe(result=>{
       this.statesList = result;
    });
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
    this.locationsService.postLocations(locdata);
  }
}
