import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableService, ShareGraphService, DKAService } from 'src/app/@core/shared/services';
import { CProgram, UProgram, Series, DKA, CWeight, UWeight } from 'src/app/@core/models';

@Component({
  selector: 'app-compare-tool',
  templateUrl: './compare-tool.component.html',
  styleUrls: ['./compare-tool.component.scss']
})
export class CompareToolComponent implements OnInit {

  dkas: DKA[] = [];

  selectedCPrograms: Series[] = [];
  selectedUPrograms: Series[] = [];

  selectedSeries: Series[] = [];

  graphLink: string = '';

  constructor(
    private dkaService: DKAService,
    private tableService: TableService,
    private shareGraphService: ShareGraphService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.dkaService.readAll().subscribe(
      (dkas: DKA[]) => { this.dkas = dkas }
    );
    let routeData = this.route.snapshot.queryParamMap.get('data');
    if (routeData != undefined) {
      this.shareGraphService.importGraph(routeData, this.selectedCPrograms, this.selectedUPrograms);
    }
    this.shareGraphService.onComplete$.subscribe(() => this.updateGraph());
  }

  onSelectedCProgram(program: CProgram): void {
    if (this.isProgramSelected(program)) return;
    this.tableService.readByCProgram(program.id).subscribe(
      (weights: CWeight[]) => {
        let serie = new Series(program, weights, this.color);
        this.selectedCPrograms.push(serie);
        this.updateGraph();
      }
    );
  }

  onSelectedUProgram(program: UProgram): void {
    if (this.isProgramSelected(program)) return;
    this.tableService.readByUProgram(program.id).subscribe(
      (weights: UWeight[]) => {
        let serie = new Series(program, weights, this.color);
        this.selectedUPrograms.push(serie);
        this.updateGraph();
      }
    );
  }

  isProgramSelected(program: CProgram | UProgram): boolean {
    let item;
    if (program instanceof CProgram) {
      item = this.selectedCPrograms.find(item => item.id === program.formatedId);
    }
    if (program instanceof UProgram) {
      item = this.selectedUPrograms.find(item => item.id === program.formatedId);
    }
    return item !== undefined;
  }

  updateGraph(): void {
    this.selectedSeries = this.selectedCPrograms.concat(this.selectedUPrograms);
    this.graphLink = this.shareGraphService.exportGraph(this.selectedCPrograms, this.selectedUPrograms);
  }

  get color() {
    return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
  }

}
