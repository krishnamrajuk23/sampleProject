import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../shared/services/admin.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  listSearch = [{id:1,name:'raju',phno:8885280869, paid:'N'},{id:2,name:'nilesh',phno:8885280869, paid:'N'}];
  showSerach = false;
  listArray:any[];
  search:string = '';
  toggleChecked:boolean = false;
  userAllList : any;
  searchUserObject : any;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getUsersAllList().subscribe((response:any) =>{
      this.userAllList = response.data;
    });

  }

  searchUsers(value){
    this.adminService.getUsersListByName(value).subscribe((response:any)=>{
      this.userAllList = response.data;
    });
  }

  paidUser(list){
    if(this.toggleChecked){
      // Send to api post request as paid
      this.adminService.createPaidUser(list.userId);
    } else{
      this.toggleChecked = true;
      // Send to api post request as unpaid
    }
  }

  trackByFunc(index,value){
    return value.id;
  }
}
