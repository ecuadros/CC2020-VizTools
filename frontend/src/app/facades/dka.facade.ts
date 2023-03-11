import { Injectable } from '@angular/core';
import { DKAModel } from '@core/models';
import { Store } from '@ngrx/store';
import { DKAActions } from '@store/dka/dka.actions';
import { DKASelector } from '@store/dka/dka.selectors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DKAFacade {

  constructor(
    private readonly store: Store
  ) { }

  selectDKAs(): Observable<DKAModel[]> {
    this.load();
    return this.store.select(DKASelector.selectDKAs);
  }

  add(dka: DKAModel) {
    this.store.dispatch(DKAActions.addDKA({ dka }));
  }

  load() {
    this.store.dispatch(DKAActions.loadDKAs());
  }

  update(dka: DKAModel) {
    this.store.dispatch(DKAActions.updateDKA({ dka }));
  }

  remove(dkaId: number) {
    this.store.dispatch(DKAActions.removeDKA({ dkaId }));
  }

}
