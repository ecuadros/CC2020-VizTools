import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CountryService, UniversityService, TranslateConfigService } from 'src/app/@core/shared/services';
import { Country, University, UserDetails } from 'src/app/@core/models';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss']
})
export class InfoFormComponent implements OnInit {

  @Input() formData: UserDetails;

  @Output() onSubmit = new EventEmitter<void>();

  @Output() onBack = new EventEmitter<void>();

  onlyTextPattern: any = /^[^0-9]+$/;

  phonePattern: any = /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
  phoneRules: any = { X: /[02-9]/ };

  backButtonOptions: any = {
    text: "Back",
    type: "normal",
    onClick: (): void => {
      this.onBack.emit();
    }
  };

  completeButtonOptions: any = {
    text: "Register",
    type: "success",
    useSubmitBehavior: true
  };

  countries: Country[] = [];
  universities: University[] = [];

  constructor(
    private countryService: CountryService,
    private universityService: UniversityService,
    private translateService: TranslateConfigService
  ) {
    this.translateService.get('auth.register.backButton').subscribe(
      (text: string) => { this.backButtonOptions.text = text }
    );
    this.translateService.get('auth.register.registerButton').subscribe(
      (text: string) => { this.completeButtonOptions.text = text }
    );
  }

  ngOnInit(): void {
    this.countryService.readAll().subscribe(
      (countries: Country[]) => { this.countries = countries }
    );
  }

  onFormSubmit(e): void {
    e.preventDefault();
    this.onSubmit.emit();
  }

  checkComparison(): boolean {
    return true;
  }

  onUserCountrySelected(e): void {
    this.formData.university.countryId = e.value;
    this.universityService.readByCountry(e.value).subscribe(
      (universities: University[]) => { this.universities = universities }
    );
  }

  onUniversityCountrySelected(e): void {
    this.universityService.readByCountry(e.value).subscribe(
      (universities: University[]) => { this.universities = universities }
    );
  }

  onUniversitySelected(e): void {
    let university = this.universities.find(x => x.id == e.value);
    this.formData.university = university;
  }

  onUniversityCreating(e): void {
    let emailDomain = this.formData.universityUrlTemp;
    let newUniversity = this.universities.find(university => university.id === -1);

    e.customItem = {
      id: -1,
      name: e.text,
      acronym: '',
      countryId: this.formData.university.countryId,
      url: emailDomain
    };

    if (newUniversity === undefined) {
      this.universities.push(e.customItem);
    } else {
      newUniversity.name = e.text;
    }

    this.formData.university = e.customItem
  }

}
