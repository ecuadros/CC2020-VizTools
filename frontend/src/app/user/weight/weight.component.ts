import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { AuthService, ChartService, ProgramService, UProgramService } from 'src/app/@core/services';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {

  uProgramPD: any[];
  cProgramPD: any[];
  chartDS: any;

  addProgramButton: any;

  isVisibleProgramPopup = false;

  universityId = -1;
  programId: any;

  constructor(
    private cProgramService: ProgramService,
    private uProgramService: UProgramService,
    private authService: AuthService,
    private chartService: ChartService
  ) {
    this.addProgramButton = {
      icon: "plus",
      type: "default",
      onClick: () => {
        this.isVisibleProgramPopup = true;
      }
    };
  }

  ngOnInit(): void {
    this.universityId  = this.authService.universityId;

    this.uProgramService.readByUniversity(this.universityId).then(
      response => { this.uProgramPD = response; }
    );

    this.cProgramService.readAll().then(
      response => { this.cProgramPD = response; this.cProgramPD.push({ id: -1, name: 'Undefined' }); }
    );
  }

  onRowClick(event) {
    console.log(event)
  }

  onAddDKAPrefix(data) {
    let dkaIndex = data.dkaIndex.toString();
    let dkagIndex = data.dkagIndex.toString();
    return 'C-' + dkagIndex + '.' + dkaIndex;
  }

  onAddDKAGPrefix(data) {
    let dkagIndex = data.dkagIndex;
    return 'C-' + dkagIndex + ' ' + data.dkagTitle;
  }


  onProgramSelected(e) {
    console.log(e.value.id)
    this.chartDS = this.genDataSource(e.value.id.toString());
  }

  programForm: any = {}

  onSubmitProgram() {
    this.programForm['universityId'] = this.universityId;
    this.uProgramService.create(this.programForm).then(
      reponse => {
        this.isVisibleProgramPopup = false;
        this.uProgramPD.push(reponse);
        this.programId = reponse.id;
      }
    );
  }

  genDataSource(uProgramId: any) {
    return new DataSource({
      key: 'id',
      sort: [
        { selector: "dkagIndex", desc: false }
      ],
      load: () => {
        return this.chartService.readByUProgram(uProgramId).then(
          response => {
            return { data: response };
          }
        );
      },
      update: (id, values) =>  {
        return this.chartService.updateUWeight(id, values);
      }
    });
  }

}
