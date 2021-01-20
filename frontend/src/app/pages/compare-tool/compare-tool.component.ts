import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareGraphService, DKAService, AuthService } from 'src/app/@core/shared/services';
import { Series, DKA } from 'src/app/@core/models';

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

  isAuthenticated: boolean = false;

  routeData: string;

  constructor(
    private dkaService: DKAService,
    private shareGraphService: ShareGraphService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dkaService.readAll().subscribe(
      (dkas: DKA[]) => { this.dkas = dkas }
    );
    this.routeData = this.route.snapshot.queryParamMap.get('data');
    if (this.routeData != undefined) {
      this.shareGraphService.importGraph(this.routeData, this.selectedCPrograms, this.selectedUPrograms);
    } else {
      this.router.navigate(['/']);
    }
    this.shareGraphService.onComplete$.subscribe(() => this.updateGraph());
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  editGraph(): void {
    let role: string = 'user';
    if (this.authService.isAdmin()) role = 'admin';
    this.router.navigate([role + '/compare-tool'], {queryParams: {data: this.routeData}});
  }

  updateGraph(): void {
    this.selectedSeries = this.selectedCPrograms.concat(this.selectedUPrograms);
  }

}
