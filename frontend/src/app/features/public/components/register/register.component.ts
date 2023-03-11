import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatStepper } from '@angular/material/stepper';
import { InstitutionModel, CountryModel, RegisterModel } from '@core/models';
import { AuthService, CountryService, InstitutionService } from '@core/services';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @ViewChild("stepper", { static: false })
  stepper!: MatStepper;

  formRegisterStep1!: FormGroup;
  formRegisterStep2!: FormGroup;

  filteredInstitutions: Observable<InstitutionModel[]> = new Observable<InstitutionModel[]>();

  countries: CountryModel[] = [];

  institutions: InstitutionModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private countryService: CountryService,
    private institutionService: InstitutionService
  ) { }

  ngOnInit() {
    this.formRegisterStep1 = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', { validators: [Validators.required, Validators.email], asyncValidators: [this.emailRegisteredValidator()], updateOn: 'blur' }],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), this.passwordMatchValidator('confirmPassword', true)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), this.passwordMatchValidator('password')]],
    });

    this.formRegisterStep2 = this.formBuilder.group({
      countryId: ['', [Validators.required]],
      city: ['', [Validators.required]],
      institution: ['', [Validators.required]],
      occupation: ['', [Validators.required]],
      url: ['', [Validators.required]],
      acronym: ['', [Validators.required]],
    });

    this.filteredInstitutions = this.formRegisterStep2.controls['institution'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterInstitutions(name as string) : this.institutions.slice();
      }),
    );

    this.countryService.read().subscribe({
      next: (countries: CountryModel[]) => {
        this.countries = countries;
      }
    });

    this.institutionService.read().subscribe({
      next: (institutions: InstitutionModel[]) => {
        this.institutions = institutions;
      }
    });
  }

  onRegister() {
    if (this.formRegisterStep1.invalid || this.formRegisterStep2.invalid) {
      return;
    }

    if (typeof this.formRegisterStep2.controls['institution'].value === 'string') {
      const customValue: InstitutionModel = {
        id: -1,
        name: this.formRegisterStep2.controls['institution'].value
      };
      this.formRegisterStep2.controls['institution'].setValue(customValue);
    }

    const registerModel: RegisterModel = {
      user: {
        firstName: this.formRegisterStep1.get('firstName')?.value,
        lastName: this.formRegisterStep1.get('lastName')?.value,
        email: this.formRegisterStep1.get('email')?.value,
        password: this.formRegisterStep1.get('password')?.value
      },
      userInfo: {
        institutionId: this.formRegisterStep2.get('institution')?.value.id,
        countryId: this.formRegisterStep2.get('countryId')?.value,
        city: this.formRegisterStep2.get('city')?.value,
        occupation: this.formRegisterStep2.get('occupation')?.value
      },
      institution: {
        id: this.formRegisterStep2.get('institution')?.value.id,
        name: this.formRegisterStep2.get('institution')?.value.name,
        url: this.formRegisterStep2.get('url')?.value,
        acronym: this.formRegisterStep2.get('acronym')?.value,
        countryId: this.formRegisterStep2.get('countryId')?.value
      }
    };

    this.authService.register(registerModel).subscribe({
      next: () => {
        this.stepper.next();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onInstitutionDisplay(institution: InstitutionModel): string {
    return institution && institution.name ? institution.name : '';
  }

  onInstitutionSelected(event: MatAutocompleteSelectedEvent) {
    if (event.option.value.id !== -1) {
      this.formRegisterStep2.controls['url'].setValue(event.option.value.url);
      this.formRegisterStep2.controls['acronym'].setValue(event.option.value.acronym);
    }
  }

  private emailRegisteredValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.authService.isEmailRegistered(control.value).pipe(
        map((response: boolean) => {
          return response ? { emailRegistered: true } : null;
        })
      );
    };
  }

  private passwordMatchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent && !!control.parent.value &&
        control.value ===
        (control.parent?.controls as any)[matchTo].value
        ? null
        : { mismatch: true };
    };
  }

  private _filterInstitutions(value: string): InstitutionModel[] {
    const filterValue = value.toLowerCase();
    const customValue: InstitutionModel = {
      id: -1,
      name: value,
      acronym: '',
      url: ''
    };
    return [customValue].concat(this.institutions.filter(option => option.name.toLowerCase().includes(filterValue)));
  }

}
