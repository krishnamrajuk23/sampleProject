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
  userAllList : any[] = [];
  searchUserObject : any;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getUsersAllList().subscribe((response:any) =>{
      this.userAllList = response.data.map((item:any)=>{
        item.isPaid = (item.roles.indexOf('ROLE_PUSER1') > -1);
        return item; 
      });
      console.log("user list",this.userAllList);
    });
    
  }

  searchUsers(value){
    this.adminService.getUsersListByName(value).subscribe((response:any)=>{
      this.userAllList = response.data.map((item:any)=>{
        item.isPaid = (item.roles.indexOf('ROLE_PUSER1') > -1);
        return item; 
      });
    });
    console.log("user list",this.userAllList);
  }

  paidUser(list){
    if(!list.isPaid){
      // Send to api post request as paid
      this.adminService.createPaidUser(list.userId);
    } 
  }

  trackByFunc(index,value){
    return value.id;
  }
}
