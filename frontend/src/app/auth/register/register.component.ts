import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@core/shared/services';
import { UserData, UserDetails } from 'src/app/@core/models';

enum Section { Credentials, Information, Completed }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userData: UserData = new UserData();
  userDetails: UserDetails = new UserDetails();
  
  section: Section = Section.Credentials;

  emailIcon = faEnvelopeOpenText;

  submitted: boolean = false;

  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {
    let userData = this.route.snapshot.queryParamMap.get('userData');
    if (userData != null) {
      this.userData = JSON.parse(decodeURIComponent(userData));
      this.onCredentialComplete();
    }
  }

  ngOnInit(): void {
  }

  onCredentialComplete(): void {
    let email: string = this.userData.email;
    let i: number = email.indexOf('@');
    this.userDetails.universityUrlTemp = 'wwww.' + email.substring(i + 1);
    this.section = Section.Information;
  }

  onRegisterComplete(): void {    
    let formData = {
      user: this.userData,
      userInfo: this.userDetails.userInfo,
      university: this.userDetails.university
    }
    this.spinner.show();
    this.submitted = true;
    console.log('aahola');
    this.authService.register(formData).subscribe(
      () => {
        this.spinner.hide();
        this.section = Section.Completed;
        console.log('hola');
        setTimeout(
          ()=> {
            this.router.navigate(['/'])
          }, 5000 );
      }
    );
  }

  onBackForm(): void {
    this.section = Section.Credentials;
  }

  get CredentialsSection(): number {
    return Section.Credentials;
  }

  get InformationSection(): number {
    return Section.Information;
  }

  get CompletedSection(): number {
    return Section.Completed;
  }

}
