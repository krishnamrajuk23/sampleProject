import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { LocationsService } from '../../shared/services/locations.service';
import {AdminService} from "../../shared/services/admin.service";
const projectId = "localNews";

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss']
})
export class AddLocationComponent implements OnInit {
  addChannelForm : FormGroup;
  flag: boolean = true; //public
  locationPoints : any[] = [];
  approversData: any[];
  selectApprover: any;
  approverFlag : boolean = false;

constructor(
    private fb: FormBuilder,
    private adminService: AdminService) {
}

  ngOnInit() {
    this.addChannelDetails();
    /*this.locationsService.getStates().subscribe(result=>{
       this.statesList = result;
    });*/
  }

  addChannelDetails(){
    this.addChannelForm = this.fb.group({
      name:[''],
      desc:[''],
      publicChannel:[''],
      location:['']
    });
  }

  handleAddressChange(loc){
    console.log("location",loc.geometry.location.toJSON());
    this.locationPoints.push(loc.geometry.location.toJSON());
  }

  addChannel(channelObj){
    console.log("channels", channelObj.value);
    channelObj.value.locations = this.locationPoints.length > 0 ? this.locationPoints : [{lat:83.23121, lng:32.342211}];
    channelObj.value.publicChannel = this.flag ;
    this.adminService.createChannels(channelObj.value);
  }

  selectChannelType(flag){
    this.approverFlag = flag;
  }

}
