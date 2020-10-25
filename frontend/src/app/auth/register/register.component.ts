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

  registerForm: FormGroup;
  universityRegForm: FormGroup;
  universitySelForm: FormGroup;
  submitted = false;
  returnUrl: string;
  universitySection = false;
  universitySelection = true;

  universityPD: any;
  countryPD: any;

  countryFilterPD: any;
  countrySelected = false;

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
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]]
    });

    this.universityRegForm = this.formBuilder.group({
      name: ['', Validators.required],
      acronym: ['', Validators.required],
      domain: ['', Validators.required],
      country: ['', Validators.required],
      occupation: ['', Validators.required]
    });

    this.universitySelForm = this.formBuilder.group({
      university: ['', Validators.required],
      occupation: ['', Validators.required]
    });

    this.countryService.readAll().then(
      response => { this.countryPD = response }
    );

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onUserRegister() {
    this.universitySection = true;
  }

  onUniversityRegister() {
    this.submitted = true;
    let form = {
      user: {
        name: this.regForm.firstName.value,
        lastName: this.regForm.lastName.value,
        email: this.regForm.email.value,
        password: this.regForm.password.value,
        occupation: this.urForm.occupation.value
      },
      university: {
        name: this.urForm.name.value,
        acronym: this.urForm.acronym.value,
        url: this.urForm.domain.value,
        countryId: this.urForm.country.value,
      },
      isUniversityRegister: false
    }
    this.authService.register(form).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
        },
      error => {
        this.universitySection = false;
        this.alertService.error(error.error, this.options);
        this.submitted = false;
      }
    );
  }

  onUniversitySelect() {
    this.submitted = true;
    let form = {
      user: {
        name: this.regForm.firstName.value,
        lastName: this.regForm.lastName.value,
        email: this.regForm.email.value,
        password: this.regForm.password.value,
        occupation: this.urForm.occupation.value,
        universityId: this.usForm.university.value
      },
      university: null,
      isUniversityRegister: true
    }
    this.authService.register(form).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
        },
      error => {
        this.universitySection = false;
        this.alertService.error(error.error, this.options);
        this.submitted = false;
      }
    );
  }

  onCountrySelected(e) {
    this.universityService.readByCountry(e.value).then(
      response => { this.universityPD = response; this.countrySelected = true; }
    );
  }

  backForm() {
    this.universitySection = false;
  }

  changeUniversityView() {
    this.universitySelection = !this.universitySelection;
  }

  get regForm() {
    return this.registerForm.controls;
  }

  get urForm() {
    return this.universityRegForm.controls;
  }

  get usForm() {
    return this.universitySelForm.controls;
  }

}
