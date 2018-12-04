import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST_URL } from "../config/host.config";

@Injectable({
  providedIn: "root"
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getLocalNews() {
    return this.http.get(HOST_URL + "public/news");
  }
  getLocalNewsById(id) {
    return this.http.get(HOST_URL + "public/news?newsId="+id);
  }

  getLocalNewsByLocation(locations){
    return this.http.get(HOST_URL + "public/news?locations="+locations);
  }

  getChannelNewsById(channelId){
    return this.http.get(HOST_URL+ "public/channel/"+channelId + "/news");
  }

}
