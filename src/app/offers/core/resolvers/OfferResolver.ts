import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { IOffer } from "../../../core/interfaces/IOffer";
import { DataService } from "../../../core/services/DataService";

@Injectable()
export class OffersResolver implements Resolve<IOffer[]> {
  constructor(
    private _dataService: DataService
  ) {}

  public resolve(): Observable<IOffer[]> {
    return forkJoin(
      this._dataService.getAllDataFromDB('Offers'),
      this._dataService.getAllDataFromDB('Most-Picked-Places'),
    );
  }
}
