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

  subscribeChannel(channelId){
    return this.http.post(HOST_URL + "user/channel/subscribe/"+channelId+"?access_token="+ this.sharedProperties.tokenAuthKey,null);
  }

  unsubscribeChannel(channelId){
    return this.http.delete(HOST_URL  + "user/channel/unsubscribe/"+channelId+"?access_token="+ this.sharedProperties.tokenAuthKey);
  }

  subscribeChannelList(){
    return this.http.get(HOST_URL + "user/subscribed-channels?access_token="+ this.sharedProperties.tokenAuthKey);
  }

  getSubscribeChannel(){
    return this.http.get(HOST_URL + "user/subscribed-channels?access_token="+ this.sharedProperties.tokenAuthKey);
  }
  
}
