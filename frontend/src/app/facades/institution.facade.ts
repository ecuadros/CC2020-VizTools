import { Injectable } from '@angular/core';
import { InstitutionModel } from '@core/models';
import { Store } from '@ngrx/store';
import { InstitutionActions } from '@store/institution/institution.actions';
import { InstitutionSelector } from '@store/institution/institution.selectors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitutionFacade {

  constructor(
    private readonly store: Store
  ) { }

  selectInstitutionsByCountry(countryId: number): Observable<InstitutionModel[]> {
    this.loadInstitutionsByCountry(countryId);
    return this.store.select(InstitutionSelector.selectInstitutionsByCountry({ countryId }));
  }

  loadInstitutionsByCountry(countryId: number) {
    this.store.dispatch(InstitutionActions.loadInstitutionsByCountry({ countryId }));
  }

}
