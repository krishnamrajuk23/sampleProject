import { Injectable } from '@angular/core';
import {SharedPropertiesService} from "./shared-properties.service";
import {HttpClient} from "@angular/common/http";
import { HOST_URL } from "../config/host.config";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(
    private sharedProperties : SharedPropertiesService,
    private http : HttpClient
  ) { }

  getPublicChannels(){
    return this.http.get(HOST_URL + "public/channels?publicChannel="+ true);
  }
  getPrivateChannels(){
    return this.http.get(HOST_URL + "public/channels?publicChannel="+ false);
  }

  subscribeChannel(id){
    return this.http.get(HOST_URL + "user/channel/subscribe/"+id+"?access_token="+ this.sharedProperties.tokenAuthKey);
  }

  unsubscribeChannel(id){
    return this.http.get(HOST_URL  + "user/channel/unsubscribe/"+id+"?access_token="+ this.sharedProperties.tokenAuthKey);
  }
}
