import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from '../shared/services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;
  recaptcha:any;

  constructor(
    private fb:FormBuilder,
    private registerService: RegistrationService,
    private router: Router) { }

  ngOnInit() {
    this.registrationForm();
  }

  registrationForm() {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      phnoEmail: ["", Validators.required/*[Validators.required, Validators.email]*/],
      password: ["", Validators.required]
    });
  }

  onRegistration(event) {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    //event.value.recaptchaResp = this.recaptcha;
    this.registerService.addRegistrationDetails(event.value);
    this.router.navigate(['/login']);
  }

}
