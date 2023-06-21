import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { DataService } from "../../../core/services/DataService";

@Injectable()
export class DashboardResolver implements Resolve<any[]> {
  constructor(
    private readonly _dataService: DataService
  ) {}

  public resolve(): Observable<any[]> {
    return forkJoin(
      this._dataService.getAllDataFromDB('/Slider-Images-URL\'s'),
      this._dataService.getAllDataFromDB('Most-Picked-Places')
    );
  }
}
