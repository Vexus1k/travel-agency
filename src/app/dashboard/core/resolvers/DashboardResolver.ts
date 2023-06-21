import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { DataService } from "../../../core/services/DataService";
import { IOffer } from "../../../core/interfaces";

@Injectable()
export class DashboardResolver implements Resolve<IOffer[] | { url: string, name: string }[]> {
  constructor(
    private readonly _dataService: DataService
  ) {}

  public resolve(): Observable<IOffer[] | { url: string, name: string }[]> {
    return forkJoin(
      this._dataService.getAllDataFromDB('/Slider-Images-URL\'s'),
      this._dataService.getAllDataFromDB('Most-Picked-Places')
    );
  }
}
