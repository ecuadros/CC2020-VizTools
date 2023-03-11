import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DisciplineModel, ProgramModel, PWeightModel } from '@core/models';
import { AuthService } from '@core/services';
import { DisciplineFacade, DKAFacade, DKAGFacade, ProgramFacade } from '@facades/index';
import { SelectSearchComponent } from '@shared/components/select-search/select-search.component';
import DataSource from 'devextreme/data/data_source';
import { Observable, firstValueFrom, map } from 'rxjs';

enum FormType { CREATE, EDIT }

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent {

  isProgramToolbarVisible = false;
  isProgramFormVisible = false;

  programForm!: FormGroup;
  programFormType!: FormType;

  disciplines$: Observable<DisciplineModel[]>;
  programs$!: Observable<ProgramModel[]>;
  programWeights$!: Observable<PWeightModel[]>;

  selectedProgram!: ProgramModel;
  tableDS!: DataSource;

  datagridSelectedRowDkaId: number = -1;

  @ViewChild('selectSearch')
  selectSearch!: SelectSearchComponent;

  constructor(
    private formBuilder: FormBuilder,
    private readonly dkagFacade: DKAGFacade,
    private readonly dkaFacade: DKAFacade,
    private readonly disciplineFacade: DisciplineFacade,
    private readonly programFacade: ProgramFacade
  ) {
    this.disciplines$ = this.disciplineFacade.selectDisciplines();
    this.programs$ = this.programFacade.selectProgramsByInstitution(AuthService.authToken.institutionId);

    this.programForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      nativeName: [''],
      acronym: ['', [Validators.required]],
      disciplineId: ['', [Validators.required]]
    });

    this.tableDS = new DataSource({
      key: 'id',
      load: () => firstValueFrom(this.programWeights$),
      update: (id, values) => {
        const weight = values as PWeightModel;
        weight.id = id;
        weight.value = weight.value > 5 ? 5 : weight.value < 0 ? 0 : weight.value;
        this.programFacade.updateWeightByProgram(this.selectedProgram.id, weight);
        return firstValueFrom(this.programWeights$.pipe(
          map(weights => weights.find(w => w.id === id) as PWeightModel)
        ));
      }
    });
  }

  ngOnInit(): void {
    this.dkagFacade.load();
    this.dkaFacade.load();
  }

  onDatagridFocusedRowChanged(event: any) {
    this.datagridSelectedRowDkaId = event.row.data.dkaId;
  }

  onProgramSelected(program: ProgramModel) {
    this.selectedProgram = program;
    this.isProgramFormVisible = false;
    this.isProgramToolbarVisible = true;
    this.programWeights$ = this.programFacade.selectWeightsByProgram(this.selectedProgram.id);
    this.programWeights$.subscribe(
      () => {
        this.tableDS.reload();
      }
    );
  }

  onProgramCreate() {
    this.isProgramFormVisible = true;
    this.programFormType = FormType.CREATE;
    this.programForm.reset();
    this.tableDS.reload();
  }

  onProgramEdit() {
    this.isProgramFormVisible = true;
    this.programFormType = FormType.EDIT;
    this.programForm.patchValue(this.selectedProgram);
  }

  onProgramDelete() {
    this.isProgramFormVisible = false;
    this.isProgramToolbarVisible = false;
    this.programFacade.remove(this.selectedProgram.id);
    this.tableDS.reload();
    this.selectSearch.reset();
  }

  onProgramFormSubmit() {
    if (this.programForm.invalid) {
      return;
    }
    const program = this.programForm.value as ProgramModel;
    if (this.programFormType === FormType.CREATE) {
      this.programFacade.add(program);
    } else {
      program.id = this.selectedProgram.id;
      this.programFacade.update(program);
    }
    this.programForm.reset();
    this.selectSearch.reset();
    this.isProgramFormVisible = false;
    this.isProgramToolbarVisible = false;
  }

  onProgramFormCancel() {
    this.programForm.reset();
    this.isProgramFormVisible = false;
  }

}
