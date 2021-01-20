import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UProgramService } from 'src/app/@core/shared/services';
import { UProgram } from 'src/app/@core/models';

@Component({
  selector: 'app-dl-user-programs',
  templateUrl: './dl-user-programs.component.html',
  styleUrls: ['./dl-user-programs.component.scss']
})
export class DlUserProgramsComponent implements OnInit {

  @Input() universityId: number = -1;

  @Output() onSelected = new EventEmitter<any>();
  
  programs: UProgram[] = []

  selectedProgram: UProgram;

  constructor(
    private uProgramService: UProgramService
  ) { }

  ngOnInit(): void {
    this.uProgramService.readByUniversity(this.universityId).subscribe(
      (programs: UProgram[]) => { this.programs = programs }
    );
  }

  onSelectedProgram(e): void {
    let selectedProgram = e.value;
    this.onSelected.emit(selectedProgram);
    this.selectedProgram = undefined;
  }

}
