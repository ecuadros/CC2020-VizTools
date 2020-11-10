import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { ChartService, DKAGService, DKAService, ProgramService } from 'src/app/@core/services';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {

  dkaPD = [];
  dkagPD = [];

  programPD: any[];

  chartDS: any = {}
  chartPD: any = {}

  programSelected = {};
  addProgramButton: any;

  isVisibleDKAGPopup: boolean = false;
  isVisibleProgramPopup: boolean = false;

  constructor(
    private dkaService: DKAService,
    private dkagService: DKAGService,
    private programService: ProgramService,
    private chartService: ChartService) {
    this.addProgramButton = {
      icon: "plus",
      type: "default",
      onClick: () => {
        this.isVisibleProgramPopup = true;
      }
    };
  }

  ngOnInit() {
    this.dkagService.readAll().then(
      response => { this.dkagPD = response }
    );

    this.dkaService.readAll().then(
      response => { this.dkaPD = response; }
    );

    this.programService.readAll().then(
      response => {
        let programPromises = [];

        response[0]['selected'] = true;

        for (let i = 1; i < response.length; i++) {
          response[i]['selected'] = true;
          programPromises.push(this.chartService.readByProgram(response[i].id.toString()))
        }

        Promise.all(programPromises).then(values => {
          for (let val of values) {
            this.selectedPrograms.push({
              id: val[0].programId,
              data: val,
              name: val[0].programTitle
            });
          }
          
          this.chartDS = this.genDataSource(response[0].id);
          this.programPD = response;
        })
      });
  }

  onProgramSelected(e) {
    this.programSelected = e.value;
    let programId = e.value.id
    this.chartService.readByProgram(programId).then(
      response => { this.chartPD = response }
    )
  }

  onAddProgram(e) {
  }

  onRowUpdated(e) {
  }

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }


  dkagIdSelected: number;
  dkagForm: any = {};

  syncProgramViewSelection($event) {

  }

  onRowClick(event) {
    console.log(event)
    if (event.data.items == null) return;
    this.dkagIdSelected = this.dkagPD.findIndex(dkag => dkag.id === event.data.items[0].dkagId)
    let dkagSelected = this.dkagPD[this.dkagIdSelected]
    this.dkagForm = { name: dkagSelected.name }
    this.isVisibleDKAGPopup = true;
  }

  programForm: any = {}



  /*
   * Prefix Functions
   */

  onAddDKAPrefix(data) {
    let dkaIndex = data.dkaIndex.toString();
    let dkagIndex = data.dkagIndex.toString();
    return 'C-' + dkagIndex + '.' + dkaIndex;
  }

  onAddDKAGPrefix(data) {
    let dkagIndex = data.dkagIndex.toString();
    return 'C-' + dkagIndex + ' ' + data.dkagTitle;
  }

  programBoxValue: any;
  selectedPrograms = [];

  treeView_itemSelectionChanged(event) {
    let item = event.itemData;
    if (item.selected == true) {
      this.chartDS = this.genDataSource(item.id);
    } else {
      this.selectedPrograms = this.selectedPrograms.filter(program => program.id != item.id);
    }
  }

  onSubmitDKAG() {
    let dkagSelected = this.dkagPD[this.dkagIdSelected]
    if (dkagSelected.name != this.dkagForm.name) {
      this.dkagService.update(dkagSelected.id, this.dkagForm).then(
        response => {
          this.dkagPD[this.dkagIdSelected] = response
          this.dkagPD = this.dkagPD.slice();
          this.isVisibleDKAGPopup = false;
        }
      )
    }
  }

  onSubmitProgram() {
    /** */
  }

  removeDKA(value) {
    this.dkaService.delete(value.dkaId);
  }

  onEditorPreparing(e) {
    console.log(e)
  }

  genDataSource(programId) {
    return new DataSource({
      key: 'id',
      sort: [],
      load: () => {
        return this.chartService.readByProgram(programId.toString()).then(
          (response: any[]) => {
            this.selectedPrograms.push({ id: programId, name: response[0].programTitle, data: response });
            let emptyRows = this.createEmptyRows(response);
            let data = response.concat(emptyRows);
            return { data: this.insertAttr(data) };
          }
        );
      },
      update: (id, values) => {
        if (id == -1 && values.dkaTitle != '(new)') {
          let data = {
            name: values.dkaTitle,
            index: values.dkaIndex,
            dkagId: values.dkagId
          }
          return this.dkaService.create(data);
        }
        return this.chartService.updateWeight(id, values);
      }
    });
  }

  createEmptyRows(data) {
    let filtered = []
    let emptyRows = []
    for (let dkag of this.dkagPD) {
      filtered = data.filter(row => row.dkagId == dkag.id).slice();
      emptyRows.push({
        id: -1,
        dkagId: dkag.id,
        dkaId: -1,
        dkagTitle: dkag.name,
        dkaTitle: '(new)',
        dkagIndex: dkag.index,
        dkaIndex: filtered.length + 1,
      })
    }
    return emptyRows;
  }

  insertAttr(data) {
    let t_row, programId;
    for (let row of data) {
      for (let program of this.selectedPrograms) {
        t_row = program.data.find(x => x.dkaId == row.dkaId);
        if (t_row != undefined && t_row.id != -1) {
          programId = t_row.programId.toString();
          row[programId + '_min'] = t_row.min;
          row[programId + '_max'] = t_row.max;
        } else {
          programId = program.data[0].programId.toString();
          row[programId + '_min'] = 0;
          row[programId + '_max'] = 0;
        }
      }
    }
    return data;
  }
}
