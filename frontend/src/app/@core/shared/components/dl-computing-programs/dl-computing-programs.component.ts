import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CProgramService } from '../../services';
import { CProgram } from '../../../models';

@Component({
  selector: 'app-dl-computing-programs',
  templateUrl: './dl-computing-programs.component.html',
  styleUrls: ['./dl-computing-programs.component.scss']
})
export class DlComputingProgramsComponent implements OnInit {

  @Output() onSelected = new EventEmitter<CProgram>();

  programs: CProgram[] = [];

  selectedProgram: CProgram;

  constructor(
    private cProgramService: CProgramService,
  ) { }

  ngOnInit(): void {
    this.cProgramService.readAll().subscribe(
      (programs: CProgram[]) => { this.programs = programs }
    );
  }

  onSelectedProgram(e): void {
    let selectedProgram: CProgram = e.value;
    this.onSelected.emit(selectedProgram);
    this.selectedProgram = undefined;
  }

}
