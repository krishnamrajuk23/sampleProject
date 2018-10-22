import {Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RegistrationService } from "../shared/services/registration.service";
import { RegisterValidationService } from "../shared/services/register-validation.service";
import { ReCaptchaV3Service } from 'ngx-captcha';
import {LoginService} from "../shared/services/login.service";
import {SharedPropertiesService} from '../shared/services/shared-properties.service';
import {LoginDataModal} from '../shared/modal/loginData.modal';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  showMenu = true;
  isLogin = true;
  isRegister = false;
  registerForm: FormGroup;
  loginForm: FormGroup;
  submitted = false;
  loginStatus = false;
  validationMessage: any = "";
  siteKey = '6Ldd13AUAAAAACSxjaIFUPhhHCRi1vBDeep0b3EG';
  recaptcha:string;
  userInformation : LoginDataModal;
  dashboard = false;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegistrationService,
    private registerValidationService: RegisterValidationService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private loginService: LoginService,
    private sharedProperties: SharedPropertiesService
  ) {}

  ngOnInit() {
    this.registrationForm();
    this.loginformDetails();
    if(this.sharedProperties.loginResponseResult){
      this.sharedProperties.setLoginStatus(this.sharedProperties.loginResponseResult);
      this.userInformation = this.sharedProperties.loginResponseResult;
    }
    this.sharedProperties.loginStatusResponse.subscribe(result => {
      this.userInformation = result;
    });
    if(this.router.url === "/editor" || this.router.url === "/admin"){
      this.dashboard = true;
    }
  }
  @ViewChild('authenticatePopUp') modalTemplate:TemplateRef<any>;

  public ngAfterViewInit(): void {
      this.authenticate_loop();
  }


  private authenticate_loop() {
    setTimeout (() => {
      this.modalService.open(this.modalTemplate, { centered: true });
    }, 30000)
  }

  goToRegister(content,alertmodal){
    this.isLogin = false;
    this.isRegister = true;
    alertmodal.close();
    this.openVerticallyCentered(content);
  }
  openVerticallyCentered(content) {
    this.isLogin = true;
    this.isRegister = false;
    this.modalService.open(content, { centered: true });
  }

  loginformDetails() {
    this.loginForm = this.fb.group({
      userId: ["",Validators.required],
      password: ["",Validators.required]
    });
  }


  onLogin(loginForm, modal) {
    this.loginStatus = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    modal.close();
   /* this.loginService.authToken(this.loginForm.value);*/
   this.loginService.loginStatus(loginForm.value);

  }

  registrationForm() {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      emailId: ["", [Validators.required, Validators.email]],
      phoneNum: ["", Validators.required],
      password: ["", Validators.required],
      userId: ["", Validators.required],
      recaptchaResp: ['', Validators.required]
    });
  }

  onRegistration(event) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    event.value.recaptchaResp = this.recaptcha;
    this.registerService.addRegistrationDetails(event.value);
    this.isLogin = this.registerService.registerStatus;
    this.isRegister = !this.registerService.registerStatus;
  }

  //register validation service for each input field
  onBlurMethod(event) {
    const fieldData = event.currentTarget;
    this.registerValidationService
      .getValidationFormFields(fieldData.id, fieldData.value)
      .subscribe(response => {
        this.validationMessage = response;
        console.log(response);
      });
  }
  handleSuccess(event){
    console.log('This event: ', event);
    this.recaptcha = event;
  }

  dashboardRedirect(response){
    (!response.approver) ? this.router.navigate(["editor"]): this.router.navigate(['admin']);

  }

  logout(){
    sessionStorage.setItem("loginResult","");
    this.router.navigate(['home']);
    this.sharedProperties.setLoginStatus(null);
  }
}
