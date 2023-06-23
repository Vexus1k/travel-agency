import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly _basePath = 'http://localhost:3000'

  constructor(
    private readonly _http: HttpClient
  ) {
  }

  public getAllDataFromDB(databaseName: string): Observable<any> {
    const params = new HttpParams().set('databaseName', databaseName);
    return this._http.get(`${this._basePath}/getDataFromFirebaseDB`, {params});
  }
}
