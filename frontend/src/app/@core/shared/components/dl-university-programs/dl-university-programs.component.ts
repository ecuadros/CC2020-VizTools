import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CountryService, UniversityService, UProgramService } from 'src/app/@core/shared/services';
import { Country, University, UProgram } from '../../../models';

@Component({
  selector: 'app-dl-university-programs',
  templateUrl: './dl-university-programs.component.html',
  styleUrls: ['./dl-university-programs.component.scss']
})
export class DlUniversityProgramsComponent implements OnInit {

  @Output() onSelected = new EventEmitter<UProgram>();

  countries: Country[] = [];
  universities: University[] = [];
  programs: UProgram[] = [];

  selectedProgram: UProgram;

  constructor(
    private countryService: CountryService,
    private universityService: UniversityService,
    private uProgramService: UProgramService
  ) { }

  ngOnInit(): void {
    this.countryService.readAll().subscribe(
      (countries: Country[]) => { this.countries = countries }
    );
  }

  onSelectedCountry(e): void {
    let countryId: number = e.value.id;
    this.universityService.readByCountry(countryId).subscribe(
      (universities: University[]) => { this.universities = universities }
    );
  }

  onSelectedUniversity(e): void {
    let universityId: number = e.value.id
    this.uProgramService.readByUniversity(universityId).subscribe(
      (programs: UProgram[]) => { this.programs = programs }
    );
  }

  onSelectedProgram(e): void {
    let selectedProgram: UProgram = e.value;
    this.onSelected.emit(selectedProgram);
    this.selectedProgram = undefined;
  }

}
