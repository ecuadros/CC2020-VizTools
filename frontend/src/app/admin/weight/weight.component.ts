import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { TableService, DKAService, CProgramService, SessionService, TranslateConfigService } from 'src/app/@core/shared/services';
import { CProgram, CWeight, DKA, Series } from 'src/app/@core/models';
import { MultiprogramGridComponent } from './multiprogram-grid/multiprogram-grid.component';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {

  dkas: DKA[] = [];
  cPrograms: CProgram[] = [];

  selectedPrograms: CProgram[] = [];
  selectedCProgram: CProgram = new CProgram({name: ''});

  programBoxValue = [];

  series: Series[] = [];

  programFormData: CProgram = new CProgram();
  programFormVisible: boolean = false;

  addProgramButton: any = {
    icon: 'plus',
    type: 'default',
    onClick: () => {
      this.programFormVisible = true;
    }
  };

  submitButtonOptions: any = {
    text: 'Create',
    type: 'success',
    useSubmitBehavior: true
  };

  @ViewChild(MultiprogramGridComponent) multiprogramGrid;

  constructor(
    private dkaService: DKAService,
    private cProgramService: CProgramService,
    private sessionService: SessionService,
    private tableService: TableService,
    private translateService: TranslateConfigService
  ) {
    this.translateService.get('admin.home.newProgramFormSubmitButton').subscribe(
      (text: string) => { this.submitButtonOptions.text = text }
    );
  }

  ngOnInit(): void {
    let observables: Observable<any>[] = [];

    observables.push(this.dkaService.readAll());
    observables.push(this.cProgramService.readAll());

    forkJoin(observables).subscribe(
      ([dkas, programs]) => {
        this.dkas = <DKA[]>dkas;
        this.cPrograms = <CProgram[]>programs;

        this.cPrograms.forEach(program => {
          program['selected'] = true;
          this.programBoxValue.push(program.id);
          this.selectedPrograms.push(program);
        })

        this.sessionService.readLastSelectedProgram().subscribe(
          (programId: number) => {
            this.selectedCProgram = this.cPrograms.find(program => program.id == programId);
            this.updateGraph(programId);
          }
        );

        this.multiprogramGrid.constructTable();
      }
    );
  }

  onSelectedProgram(program: CProgram): void {
    this.updateGraph(program.id);
  }

  syncProgramSelectionChanged(e): void {
    let item = e.itemData;
    if (item.selected == true) {
      this.selectedPrograms.push(item);
      this.multiprogramGrid.constructTableDS();
    } else {
      this.selectedPrograms = this.selectedPrograms.filter(program => program.id != item.id);
    }
    this.programBoxValue = e.component.getSelectedNodeKeys();
  }

  updateGraph(programId: number): void {
    this.selectedCProgram = this.cPrograms.find(program => program.id == programId);
    this.sessionService.updateLastSelectedProgram(programId).subscribe();

    this.tableService.readByCProgram(programId).subscribe(
      (weights: CWeight[]) => {
        this.series = [new Series(this.selectedCProgram, weights, '#000fff')];
      }
    );
  }

  onCreateProgram(e): void {
    e.preventDefault();
    this.cProgramService.create(this.programFormData).subscribe(
      (program: CProgram) => {
        this.cPrograms.push(program);
        this.programFormVisible = false;
        this.programFormData = new CProgram();
      }
    );
  }

}
