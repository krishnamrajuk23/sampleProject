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
export class AddChannelComponent implements OnInit {
  addChannelForm : FormGroup;
  flag: boolean = false; //public
  locationPoints : any[] = [];
  approversData: any[];
  selectApprover: any;
  approverFlag : boolean = true;
  approversId:string;

constructor(
    private fb: FormBuilder,
    private adminService: AdminService) {
}

  ngOnInit() {
    this.addChannelDetails();
    this.adminService.getPaidUser().subscribe((response:any)=>{
      this.approversData = response.data;
    })
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
    this.locationPoints.push(loc.geometry.location.toJSON());
  }

  addChannel(channelObj){
    const channel = channelObj.value;
    channel.locations = this.locationPoints.length > 0 ? this.locationPoints : [{lat:83.23121, lng:32.342211}];
    channel.publicChannel = this.flag ;
    channel.approvers = [this.approversId];
    this.adminService.createChannels(channel);
  }

  selectChannelType(flag){
    this.approverFlag = flag;
  }

  approverSelection(selectApprover){
    this.approversId = selectApprover.userId;
  }
  autoCompleteCallback1(event){

  }
}
