import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import { tap,map} from 'rxjs/operators';
import { AlertService } from "./shared/services/alert.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AppInterceptor implements HttpInterceptor{
  constructor( private alertService: AlertService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(req).pipe(
      tap(event=>{
      if(event instanceof HttpResponse){
        console.log("Interceptor event",event);
        console.log("Interceptor req",req);
        if(req.method != "GET"){
          this.success(event);
        }
      }
    },(event)=>{
        this.success(event);
      })
    )
  }

  private success(event){
    if(event.status === 200){
       this.alertService.showAlert({
         message: event.error ? "successful submitted" : "successful submitted",
         status:200,
         type:'success'
       });
    }else{
      this.error(event);
    }
  }

  private error(event){
    if(event.status !== 200){
      this.alertService.hideAlert({
        message: event.error.text,
        status:event.status,
        type:'error'
      });
    }
  }

}
