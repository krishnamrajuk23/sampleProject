import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {
  @Input() data:Array<any> = [];
  @Output() onSelectAll = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  multiSelectData:any;
  allItems = false;
  showDropdown = false;
  constructor() { }

  ngOnInit() {
    this.multiSelectData = this.data.map(item => {
      item.selectValue = item.selectValue ? true : false;
      return item;
    });
  }
  removeItem(removeItem){
    this.multiSelectData = this.multiSelectData.map(item=>{
       if(item.id === removeItem.id){
         item.selectValue = false;
       }
      return item;
    });
  }
  onChange(val){
    val.selectValue = !val.selectValue;
    this.onSelect.emit(this.multiSelectData);
  }
  selectAll(multiSelect) {
    if (event) {
       multiSelect.map(item => {
        item.selectValue = true;
        return item;
      });
      this.onSelectAll.emit(this.multiSelectData);
    } else {
       multiSelect.map(item => {
        item.selectValue = false;
        return item;
      });
      this.onSelectAll.emit('all');
    }
  }


}
