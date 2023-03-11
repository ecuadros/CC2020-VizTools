import { Injectable } from '@angular/core';
import { DKAGModel } from '@core/models';
import { Store } from '@ngrx/store';
import { DKAGActions } from '@store/dkag/dkag.actions';
import { DKAGSelector } from '@store/dkag/dkag.selectors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DKAGFacade {

  constructor(
    private readonly store: Store
  ) { }

  selectDKAGs(): Observable<DKAGModel[]> {
    this.load();
    return this.store.select(DKAGSelector.selectDKAGs);
  }

  add(dkag: DKAGModel) {
    this.store.dispatch(DKAGActions.addDKAG({ dkag }));
  }

  load() {
    this.store.dispatch(DKAGActions.loadDKAGs());
  }

  update(dkag: DKAGModel) {
    this.store.dispatch(DKAGActions.updateDKAG({ dkag }));
  }

  remove(dkagId: number) {
    this.store.dispatch(DKAGActions.removeDKAG({ dkagId }));
  }

}
