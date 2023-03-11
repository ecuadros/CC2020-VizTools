import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramModel, DisciplineModel, SeriesModel } from '@core/models';
import { DisciplineFacade } from '@facades/discipline.facade';
import { DKAFacade } from '@facades/dka.facade';
import { DKAGFacade } from '@facades/dkag.facade';
import { ProgramFacade } from '@facades/program.facade';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-public-compare-tool',
  templateUrl: './public-compare-tool.component.html',
  styleUrls: ['./public-compare-tool.component.scss']
})
export class PublicCompareToolComponent {

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
    private readonly dkagFacade: DKAGFacade,
    private readonly dkaFacade: DKAFacade,
    private readonly disciplineFacade: DisciplineFacade,
    private readonly programFacade: ProgramFacade,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.dkagFacade.load();
    this.dkaFacade.load();

    this.series$ = new BehaviorSubject([] as SeriesModel[]);

    let disciplines = this.route.snapshot.queryParamMap.get('d');
    let programs = this.route.snapshot.queryParamMap.get('p');

    if (disciplines == undefined && programs == undefined) {
      this.router.navigate(['/']);
    } else {
      this.decodeShareLink();
    }
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
  }

  decodeShareLink() {
    let disciplines = this.route.snapshot.queryParamMap.get('d');
    let programs = this.route.snapshot.queryParamMap.get('p');

    if (disciplines) {
      let disciplinesIds = disciplines.split(',').map(d => +d.split(':')[0]);
      let disciplinesColors = disciplines.split(',').map(d => '#' + d.split(':')[1]);
      this.disciplineFacade.selectDisciplinesByMultipleIds(disciplinesIds, true).subscribe(disciplines => {
        disciplines.forEach((d, index) => {
          this.selectedDisciplines.push(new DisciplineModel({ ...d, color: disciplinesColors[index] }));
        });
        this.generateSeries();
      });
    }

    if (programs) {
      let programsIds = programs.split(',').map(p => +p.split(':')[0]);
      let programsColors = programs.split(',').map(p => '#' + p.split(':')[1]);
      this.programFacade.selectProgramsByMultipleIds(programsIds, true).subscribe(programs => {
        programs.forEach((p, index) => {
          this.selectedPrograms.push(new ProgramModel({ ...p, color: programsColors[index] }));
        });
        this.generateSeries();
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

}
