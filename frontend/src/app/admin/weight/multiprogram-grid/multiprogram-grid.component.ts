import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import { TableService, DKAGService, DKAService, TranslateConfigService } from 'src/app/@core/shared/services';
import { CProgram, CWeight, DKA, DKAG, Series } from 'src/app/@core/models';

@Component({
  selector: 'app-multiprogram-grid',
  templateUrl: './multiprogram-grid.component.html',
  styleUrls: ['./multiprogram-grid.component.scss']
})
export class MultiprogramGridComponent implements OnInit {

  @Input() selectedPrograms: CProgram[] = [];

  @Output() onProgramUpdate = new EventEmitter<number>();

  dkags: DKAG[] = [];
  dkas: DKA[] = [];

  tableDS: DataSource;
  tableInitialData: any = [];

  series: Series[] = [];

  dkagFormData: DKAG;
  dkagFormVisible: boolean = false;

  buttonOptions: any = {
    text: 'Save',
    type: 'success',
    useSubmitBehavior: true
  };

  newRowLabel: string = '(new)';

  constructor(
    private dkaService: DKAService,
    private dkagService: DKAGService,
    private tableService: TableService,
    private translateService: TranslateConfigService
  ) {
    this.translateService.get('admin.home.updateDKAGFormSubmitButton').subscribe(
      (text: string) => { this.buttonOptions.text = text }
    );
    this.translateService.get('admin.home.gridNewProgramLabel').subscribe(
      (text: string) => { this.newRowLabel = text }
    );
  }

  ngOnInit(): void {
    let observables: Observable<any>[] = [];

    observables.push(this.dkagService.readAll());
    observables.push(this.dkaService.readAll());

    forkJoin(observables).subscribe(
      ([dkags, dkas]) => {
        this.dkags = <DKAG[]>dkags;
        this.dkas = <DKA[]>dkas;
        this.constructTable();
      }
    );
  }

  constructTable(): void {
    this.constructInitialTable();
    this.constructTableDS();
  }

  constructTableDS(): void {
    let programIds = []
    for (let program of this.selectedPrograms) {
      programIds.push(program.id);
    }
    this.tableDS = new DataSource({
      key: 'id',
      load: () => {
        return this.tableService.readByNCPrograms(programIds).toPromise().then(
          (programWeights: CWeight[][]) => { return this.constructTablePD(programWeights) }
        );
      },
      update: (dkaId, item) => {
        let dkaItem = {
          name: item.dkaTitle,
          index: item.dkaIndex,
          dkagId: item.dkagId
        }

        let attr: string = Object.getOwnPropertyNames(item)[0];

        if (dkaId == -1 && item.dkaTitle != this.newRowLabel) {
          return this.onCreateDKA(dkaItem);
        }

        if (attr == 'dkaTitle') {
          return this.onUpdateDKA(dkaId, dkaItem);
        }

        let programId = +attr.substr(0, attr.length - 4);
        let field = attr.substr(-3, 3);
        let weightItem = {}

        if (item[attr] > 5)
          weightItem[field] = 5;
        else if (item[attr] < 0)
          weightItem[field] = 0;
        else
          weightItem[field] = item[attr];

        return this.tableService.updateCWeight(dkaId, programId, new CWeight(weightItem)).toPromise().then(
          () => { this.onProgramUpdate.emit(programId) }
        );
      }
    })
  }

  constructTablePD(programWeights: CWeight[][]): any {
    let tableData = Object.assign([], this.tableInitialData);
    let tRow, programId;
    for (let row of tableData) {
      for (let program of programWeights) {
        tRow = program.find(x => x.dkaId == row.dkaId);
        if (tRow != undefined && tRow.id != -1) {
          programId = tRow.programId.toString();
          row[programId + '_min'] = tRow.min;
          row[programId + '_max'] = tRow.max;
        } else {
          programId = program[0].programId.toString();
          row[programId + '_min'] = 0;
          row[programId + '_max'] = 0;
        }
      }
    }
    return tableData;
  }

  constructInitialTable(): void {
    let initialData = [];
    for (let dka of this.dkas) {
      let dkag = this.dkags.find(dkag => dkag.id == dka.dkagId);
      initialData.push({
        id: dka.id,
        dkagId: dkag.id,
        dkagTitle: dkag.name,
        dkagIndex: dkag.index,
        dkaId: dka.id,
        dkaTitle: dka.name,
        dkaIndex: dka.index,
      });
    };
    for (let dkag of this.dkags) {
      let dkas = this.dkas.filter(dka => dka.dkagId == dkag.id).slice();
      initialData.push({
        id: -1,
        dkagId: dkag.id,
        dkagTitle: dkag.name,
        dkagIndex: dkag.index,
        dkaId: -1,
        dkaTitle: this.newRowLabel,
        dkaIndex: dkas.length + 1,
      });
    };
    this.tableInitialData = initialData;
  }

  onRowUpdating(e): void {
    e.newData['dkagId'] = e.oldData['dkagId']
    e.newData['dkaIndex'] = e.oldData['dkaIndex']
  }

  onEditingStart(e): void {
    if (e.data.dkaId == -1 && e.column.dataField != 'dkaTitle') {
      e.cancel = true;
    }
  }

  onRowClick(e): void {
    if (e.data.items == null) return;
    let dkagSelected = e.data.items[0];
    this.dkagFormData = new DKAG(
      {
        id: dkagSelected.dkagId,
        name: dkagSelected.dkagTitle
      }
    );
    this.dkagFormVisible = true;
  }

  onDKAPrefix(data): string {
    let dkaIndex = data.dkaIndex.toString();
    let dkagIndex = data.dkagIndex.toString();
    return 'C-' + dkagIndex + '.' + dkaIndex;
  }

  onDKAGPrefix(data): string {
    let dkagIndex = data.dkagIndex.toString();
    return 'C-' + dkagIndex + ' ' + data.dkagTitle;
  }

  onUpdateDKAG(e): void {
    e.preventDefault();
    let dkagSelected = this.dkags.find(dkag => dkag.id == this.dkagFormData.id);
    if (dkagSelected == undefined) return;

    if (dkagSelected.name != this.dkagFormData.name) {
      this.dkagService.update(dkagSelected.id, this.dkagFormData).subscribe(
        (dkag: DKAG) => {
          dkagSelected.name = dkag.name
          this.constructTable();
          this.dkagFormVisible = false;
        }
      );
    }
  }

  onCreateDKA(item): Subscription {
    return this.dkaService.create(item).subscribe(
      (dka: DKA) => {
        this.dkas.push(dka);
        this.constructInitialTable();
      }
    );
  }

  onUpdateDKA(id, item): Subscription {
    return this.dkaService.update(id, item).subscribe(
      (dka: DKA) => {
        let dkaItem = this.dkas.find(x => x.id == dka.id);
        dkaItem.name = dka.name;
        this.constructInitialTable();
      }
    );
  }

  onDeleteDKA(item): void {
    this.dkaService.delete(item.dkaId).subscribe(
      () => {
        this.dkas = this.dkas.filter(dka => dka.id != item.dkaId);
        this.constructTable();
      }
    );
  }

}
