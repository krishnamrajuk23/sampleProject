import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

  searchUsers(value){
    this.listArray=  this.listSearch.filter(list =>{
      if(list.name.indexOf(value) > -1){
        return list;
      }
    });
  }

  paidUser(paid){
    if(paid == 'Y'){
      this.toggleChecked = true;
      // Send to api post request as paid
    } else{
      this.toggleChecked = true;
      // Send to api post request as unpaid
    }
  }

  trackByFunc(index,value){
    return value.id;
  }
}
