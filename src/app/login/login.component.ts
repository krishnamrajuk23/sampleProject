import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from '../shared/services/login.service';
import { SharedPropertiesService } from '../shared/services/shared-properties.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private sharedProperties : SharedPropertiesService,
    private router: Router) { }

  ngOnInit() {
    this.sharedProperties.loginStatusResponse.subscribe(result=>{
      console.log(result,"result");
      this.router.navigate['/home'];
  });
    this.loginformDetails();
    
  }

  loginformDetails() {
    this.loginForm = this.fb.group({
      user: ["",Validators.required],
      password: ["",Validators.required]
    });
  }

  onLogin(loginForm) {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
   this.loginService.loginStatus(loginForm.value);    
  }

}
