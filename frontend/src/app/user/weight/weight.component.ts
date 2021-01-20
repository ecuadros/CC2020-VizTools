import { Component, OnInit } from '@angular/core';
import { AuthService, TableService, CProgramService, UProgramService, SessionService, UniversityService, TranslateConfigService } from 'src/app/@core/shared/services';
import DataSource from 'devextreme/data/data_source';
import { forkJoin, Observable } from 'rxjs';
import { CProgram, University, UProgram, UWeight } from 'src/app/@core/models';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {

  uPrograms: UProgram[] = [];
  cPrograms: CProgram[] = [];
  tableDS: DataSource;

  university: University;
  universityId: number;

  selectedUProgram: UProgram;
  similarCProgram: CProgram;

  addProgramButton: any = {
    icon: 'plus',
    type: 'default',
    onClick: () => {
      this.isVisibleProgramPopup = true;
    }
  };

  submitButtonOptions: any = {
    text: 'Create',
    type: 'success',
    useSubmitBehavior: true,
    width: 120
  };

  programForm: any = {}
  isVisibleProgramPopup: boolean = false;

  constructor(
    private cProgramService: CProgramService,
    private uProgramService: UProgramService,
    private universityService: UniversityService,
    private authService: AuthService,
    private tableService: TableService,
    private sessionService: SessionService,
    private translateService: TranslateConfigService
  ) {
    this.translateService.get('user.home.newProgramFormSubmitButton').subscribe(
      (text: string) => { this.submitButtonOptions.text = text }
    );
  }

  ngOnInit(): void {
    let observables: Observable<any>[] = [];
    this.universityId = this.authService.universityId;

    observables.push(this.cProgramService.readAll());
    observables.push(this.uProgramService.readByUniversity(this.universityId));
    observables.push(this.universityService.read(this.universityId));
    observables.push(this.sessionService.readLastSelectedProgram());

    forkJoin(observables).subscribe(
      ([cPrograms, uPrograms, university, lastProgram]) => {
        this.cPrograms = <CProgram[]>cPrograms;
        this.uPrograms = <UProgram[]>uPrograms;
        this.university = <University>university;
        let programId: number = lastProgram;

        this.cPrograms.unshift(new CProgram({ id: -1, name: 'Undefined' }));

        if (programId != null) {
          this.selectProgram(programId);
        }
      }
    );
  }

  onSelectedProgram(e): void {
    this.selectProgram(e.value.id);
  }

  selectProgram(uProgramId: number): void {
    this.selectedUProgram = this.uPrograms.find(program => program.id == uProgramId);
    this.sessionService.updateLastSelectedProgram(uProgramId).subscribe();
    this.cProgramService.read(uProgramId).subscribe(
      (program: CProgram) => { this.similarCProgram = program }
    );
    this.tableDS = this.constructTableDS(uProgramId);
  }

  onSubmitProgram(e): void {
    e.preventDefault();
    this.programForm['universityId'] = this.universityId;
    this.uProgramService.create(this.programForm).subscribe(
      (program: UProgram) => {
        this.isVisibleProgramPopup = false;
        this.uPrograms.push(program);
        this.selectProgram(program.id);
        this.programForm = {}
      }
    );
  }

  constructTableDS(uProgramId: any): DataSource {
    return new DataSource({
      key: 'id',
      sort: [{ selector: 'dkagIndex', desc: false }],
      load: () => {
        return this.tableService.readByUProgram(uProgramId).toPromise().then(
          (weights: UWeight[]) => {
            return { data: weights };
          }
        );
      },
      update: (id, values) => {
        if (values.value < 0) {
          values.value = 0
        }
        if (values.value > 5) {
          values.value = 5
        }
        return this.tableService.updateUWeight(id, values).toPromise();
      }
    });
  }

}
