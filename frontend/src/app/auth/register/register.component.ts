import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, AuthService, CountryService, UniversityService } from 'src/app/@core/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  infoForm: FormGroup;

  submitted = false;
  returnUrl: string;
  universitySection = false;
  
  universityPD = [];
  countryPD = [];

  countryFilterPD: any;
  countrySelected = false;

  defaultDomain: string;

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private countryService: CountryService,
    private universityService: UniversityService,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]]
    });

    this.infoForm = this.formBuilder.group({
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      phone: ['', Validators.required],
      whatsApp: [false],
      telegram: [false],
      university: ['', Validators.required],
      acronym: ['', Validators.required],
      domain: ['', Validators.required],
      country: ['', Validators.required],
      countryUniversity: ['', Validators.required],
      occupation: ['', Validators.required]
    });

    this.countryService.readAll().then(
      response => { this.countryPD = response }
    );

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onUserRegister() {
    let email = this.userControl.email.value;
    this.authService.isEmailRegistered(email).then(
      response => {
        this.universitySection = true;
      }, error => {
        this.alertService.error(error.error, this.options);
      });

    let i = email.indexOf("@");
    let url = 'wwww.' + email.substring(i + 1);
    this.defaultDomain = url;
    this.infoControl.domain.setValue(url);
  }

  onCompleteRegister() {
    this.submitted = true;
    let university = this.universityPD.find(x => x.id == this.infoControl.university.value);
    let form = {
      user: {
        name: this.userControl.firstName.value,
        lastName: this.userControl.lastName.value,
        email: this.userControl.email.value,
        password: this.userControl.password.value
      },
      userInfo: {
        country: this.infoControl.country.value,
        city: this.infoControl.city.value,
        state: this.infoControl.state.value,
        zipCode: this.infoControl.zipCode.value,
        phone: this.infoControl.phone.value,
        whatsApp: this.infoControl.whatsApp.value,
        telegram: this.infoControl.telegram.value,
        occupation: this.infoControl.occupation.value,
      },
      university: {
        id: this.infoControl.university.value,
        name: university.name,
        acronym: this.infoControl.acronym.value,
        url: this.infoControl.domain.value,
        countryId: this.infoControl.countryUniversity.value,
      },
    }
    this.authService.register(form).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
        },
      error => {
        this.alertService.error(error.error, this.options);
        this.submitted = false;
      }
    );
  }

  onCountrySelected(e) {
    this.infoControl.countryUniversity.setValue(e.value);
    this.universityService.readByCountry(e.value).then(
      response => { this.universityPD = response; this.countrySelected = true; }
    );
  }
  
  onCountryUniversitySelected(e) {
    this.universityService.readByCountry(e.value).then(
      response => { this.universityPD = response; this.countrySelected = true; }
    );
  }

  onUniversitySelected(e) {
    let university = this.universityPD.find(x => x.id == e.value);
    this.infoControl.acronym.setValue(university.acronym);
    this.infoControl.domain.setValue(university.url);
  }

  onNewUniversity(e) {
    e.customItem = { id: -1, name: e.text };

    let newUniversity = this.universityPD.find(x => x.id == -1);

    if (newUniversity == undefined) {
      this.universityPD.push(e.customItem);
    } else {
      newUniversity.name = e.text;
    }

    this.infoControl.university.setValue(-1);
    this.infoControl.acronym.reset();
    this.infoControl.domain.setValue(this.defaultDomain);
  }

  backForm() {
    this.universitySection = false;
  }

  get userControl() {
    return this.userForm.controls;
  }

  get infoControl() {
    return this.infoForm.controls;
  }

}
