import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CountryModel, InstitutionModel, DisciplineModel, ProgramModel, SeriesModel } from '@core/models';
import { AuthService } from '@core/services';
import { CountryFacade, DisciplineFacade, DKAFacade, DKAGFacade, InstitutionFacade, ProgramFacade } from '@facades/index';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Component({
  selector: 'app-user-compare-tool',
  templateUrl: './user-compare-tool.component.html',
  styleUrls: ['./user-compare-tool.component.scss']
})
export class UserCompareToolComponent {

  userInstitutionId: number = AuthService.authToken.institutionId;

  selectedCountry!: CountryModel;
  selectedInstitution!: InstitutionModel | undefined;

  countries$!: Observable<CountryModel[]>;
  institutions$!: Observable<InstitutionModel[]>;
  disciplines$!: Observable<DisciplineModel[]>;
  ownPrograms$!: Observable<ProgramModel[]>;
  otherPrograms$!: Observable<ProgramModel[]>;

  countriesFiltered$!: Observable<CountryModel[]>;
  institutionsFiltered$!: Observable<InstitutionModel[]>;
  disciplinesFiltered$!: Observable<DisciplineModel[]>;
  ownProgramsFiltered$!: Observable<ProgramModel[]>;
  otherProgramsFiltered$!: Observable<ProgramModel[]>;

  selectedPrograms: ProgramModel[] = [];
  selectedDisciplines: DisciplineModel[] = [];

  colorPalette: Array<any> = [
    '#e57373',
    '#f06292',
    '#ba68c8',
    '#9575cd',
    '#7986cb',
    '#64b5f6',
    '#4fc3f7',
    '#4dd0e1',
    '#4db6ac',
    '#81c784',
    '#aed581',
    '#dce775',
    '#fff176',
    '#ffd54f',
    '#ffb74d',
    '#ff8a65'
  ]

  series$: BehaviorSubject<SeriesModel[]>;

  shareLink: string = '';

  constructor(
    public shareBox: MatDialog,
    private readonly dkagFacade: DKAGFacade,
    private readonly dkaFacade: DKAFacade,
    private readonly countryFacade: CountryFacade,
    private readonly disciplineFacade: DisciplineFacade,
    private readonly institutionFacade: InstitutionFacade,
    private readonly programFacade: ProgramFacade
  ) {
    this.dkagFacade.load();
    this.dkaFacade.load();
    this.countries$ = this.countryFacade.selectCountries();
    this.disciplines$ = this.disciplineFacade.selectDisciplines();
    this.ownPrograms$ = this.programFacade.selectProgramsByInstitution(this.userInstitutionId);
    this.series$ = new BehaviorSubject([] as SeriesModel[]);

    this.countriesFiltered$ = this.countries$.pipe(
      map((countries: CountryModel[]) => {
        let countriesFiltered = countries.filter((c: CountryModel) => {
          return c.programCount && c.programCount > 0;
        });
        return countriesFiltered.map((c: CountryModel) => new CountryModel({ ...c, name: `${c.name} (${c.programCount})` }));
      })
    );

    this.disciplinesFiltered$ = this.disciplines$.pipe(
      map((disciplines: DisciplineModel[]) => {
        return disciplines.filter((d: DisciplineModel) => {
          return this.selectedDisciplines.find((sd: DisciplineModel) => sd.id === d.id) === undefined;
        });
      })
    );

    this.ownProgramsFiltered$ = this.ownPrograms$.pipe(
      map((programs: ProgramModel[]) => {
        return programs.filter((p: ProgramModel) => {
          return this.selectedPrograms.find((sp: ProgramModel) => sp.id === p.id) === undefined;
        });
      })
    );
  }

  onProgramSelected(program: ProgramModel) {
    this.selectedPrograms.push(new ProgramModel({ ...program, color: this.getRandomColor() }));

    this.programFacade.selectWeightsByProgram(program.id).subscribe(weights => {
      this.selectedPrograms = this.selectedPrograms.map(p => {
        if (p.id === program.id) {
          return new ProgramModel({ ...p, weights });
        }
        return p;
      });
      this.generateSeries();
    });
  }

  onProgramRemoved(program: ProgramModel) {
    this.selectedPrograms = this.selectedPrograms.filter(p => p.id !== program.id);
    this.generateSeries();
  }

  onDisciplineSelected(discipline: DisciplineModel) {
    this.selectedDisciplines.push(new DisciplineModel({ ...discipline, color: this.getRandomColor() }));

    this.disciplineFacade.selectWeightsByDiscipline(discipline.id).subscribe(weights => {
      this.selectedDisciplines = this.selectedDisciplines.map(d => {
        if (d.id === discipline.id) {
          return new DisciplineModel({ ...d, weights });
        }
        return d;
      });
      this.generateSeries();
    });
  }

  onDisciplineRemoved(discipline: DisciplineModel) {
    this.selectedDisciplines = this.selectedDisciplines.filter(d => d.id !== discipline.id);
    this.generateSeries();
  }

  onCountrySelected(country: CountryModel) {
    this.selectedCountry = country;
    this.institutions$ = this.institutionFacade.selectInstitutionsByCountry(country.id);
    this.selectedInstitution = undefined;

    this.institutionsFiltered$ = this.institutions$.pipe(
      map((institutions: InstitutionModel[]) => {
        let institutionsFiltered = institutions.filter((i: InstitutionModel) => {
          return i.id !== this.userInstitutionId && i.programCount && i.programCount > 0;
        });
        return institutionsFiltered.map((i: InstitutionModel) => new InstitutionModel({ ...i, name: `${i.name} (${i.programCount})` }));
      })
    );
  }

  onInstitutionSelected(institution: InstitutionModel) {
    this.selectedInstitution = institution;
    this.otherPrograms$ = this.programFacade.selectProgramsByInstitution(institution.id);

    this.otherProgramsFiltered$ = this.otherPrograms$.pipe(
      map((programs: ProgramModel[]) => {
        return programs.filter((p: ProgramModel) => {
          return this.selectedPrograms.find((sp: ProgramModel) => sp.id === p.id) === undefined;
        });
      })
    );
  }

  onColorSelectedChange() {
    this.generateSeries();
  }

  generateSeries() {
    let series: SeriesModel[] = [];
    this.selectedPrograms.forEach((p: ProgramModel) => {
      series.push(new SeriesModel(p, p.color || this.getRandomColor()));
    });
    this.selectedDisciplines.forEach((d: DisciplineModel) => {
      series.push(new SeriesModel(d, d.color || this.getRandomColor()));
    });
    this.series$.next(series);
    this.encodeShareLink();
  }

  encodeShareLink() {
    let queryString = '';

    if (this.selectedDisciplines.length > 0) {
      let disciplines = this.selectedDisciplines.map(d => `${d.id}:${d.color?.substring(1)}`).join(',');
      queryString += `d=${disciplines}`;
    }

    if (this.selectedPrograms.length > 0) {
      if (queryString.length > 0) {
        queryString += '&';
      }
      let programs = this.selectedPrograms.map(p => `${p.id}:${p.color?.substring(1)}`).join(',');
      queryString += `p=${programs}`;
    }

    if (queryString.length == 0) {
      this.shareLink = '';
    } else {
      this.shareLink = `${window.location.origin}/compare-tool?${queryString}`;
    }
  }

  decodeShareLink() {
    let params = new URLSearchParams(window.location.search);
    let disciplines = params.get('d');
    let programs = params.get('p');

    if (disciplines) {
      let disciplinesIds = disciplines.split(',').map(d => +d.split(':')[0]);
      let disciplinesColors = disciplines.split(',').map(d => d.split(':')[1]);
      this.disciplineFacade.selectDisciplinesByMultipleIds(disciplinesIds, true).subscribe(disciplines => {
        disciplines.forEach((d, index) => {
          this.selectedDisciplines.push(new DisciplineModel({ ...d, color: disciplinesColors[index] }));
          this.generateSeries();
        });
      });
    }

    if (programs) {
      let programsIds = programs.split(',').map(p => +p.split(':')[0]);
      let programsColors = programs.split(',').map(p => p.split(':')[1]);
      this.programFacade.selectProgramsByMultipleIds(programsIds, true).subscribe(programs => {
        programs.forEach((p, index) => {
          this.selectedPrograms.push(new ProgramModel({ ...p, color: programsColors[index] }));
          this.generateSeries();
        });
      });
    }
  }

  getRandomColor(): string {
    let color = this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)];
    if (this.series$.value.find(s => s.color === color)) {
      return this.getRandomColor();
    }
    return color;
  }

  openShareBox(shareBoxTemplate: any) {
    const dialogRef = this.shareBox.open(shareBoxTemplate);
  }

}
