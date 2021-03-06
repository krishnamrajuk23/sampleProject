import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HOST_URL} from '../config/host.config';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http: HttpClient) { }

  getLocations(location){
    return this.http.get(HOST_URL+'public/news?locations='+location);
  }

  postLocations(data){
    this.http.post(HOST_URL+'admin/location',data).subscribe(result=>{
      console.log("successful",result);
    });
  }

  getStates(){
    return this.http.get(HOST_URL+'public/states');
  }
}
