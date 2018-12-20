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
  validationMessage: any = "";
  siteKey = '6Ldd13AUAAAAACSxjaIFUPhhHCRi1vBDeep0b3EG';
  recaptcha:string;
  userInformation : LoginDataModal;
  dashboard = false;
  userMonoGram;
  isOpen = false;
  menuOpen = false;
  isAdmin = false;
  @ViewChild('content') content;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegistrationService,
    private registerValidationService: RegisterValidationService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private sharedProperties: SharedPropertiesService
  ) {}

  ngOnInit() {

   // this.registrationForm();
    //this.loginformDetails();
    if(this.sharedProperties.loginResponseResult){
      this.userInformation = this.sharedProperties.loginResponseResult;
      this.userMonoGram = this.userInformation.name.charAt(0);
      this.isAdmin = this.sharedProperties.loginResponseResult.roles.indexOf("ROLE_ADMIN") > -1;
    }
    this.sharedProperties.loginStatusResponse.subscribe((result:any) => {
      if(result){
        this.userInformation = result ? result.data : result;
      }
    });

    if(this.router.url === "/editor" || this.router.url === "/admin"){
      this.dashboard = true;
    }
  }
  @ViewChild('authenticatePopUp') modalTemplate:TemplateRef<any>;

  public ngAfterViewInit(): void {

  }

  private authenticate_loop() {
    setTimeout (() => {
      this.modalService.open(this.modalTemplate, { centered: true });
    }, 30000)
  }


  /*openVerticallyCentered(content) {
    this.isLogin = true;
    this.isRegister = false;
    this.modalService.open(content, { centered: true });
  }*/

  openPopup(){
    this.isOpen =! this.isOpen;
  }
  openMenu(){
    this.menuOpen =! this.menuOpen;
  }

  /*goToRegister(content,alertmodal){
    this.isLogin = false;
    this.isRegister = true;
    alertmodal.close();
    //this.openVerticallyCentered(content);
  }

  registrationForm() {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      emailId: ["", /!*[Validators.required, Validators.email]*!/],
      phoneNum: ["", Validators.required],
      password: ["", Validators.required],
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
*/
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
    const redirect = response.roles.indexOf("ROLE_USER") > -1 && response.roles.indexOf("ROLE_ADMIN") > -1? true : false;
    (redirect) ? this.router.navigate(['admin']) : this.router.navigate(["editor"]);

  }

  searchUsers(){
    this.router.navigate(['/searchUsers'])
  }
  redirectToLogin(){
    this.router.navigate(['/login']);
  }

  logout(){
    sessionStorage.setItem("loginResult","");
    this.router.navigate(['home']);
    this.sharedProperties.setLoginStatus(null);
  }
  toggleMenu(){
    this.menuOpen = false;
  }

}
