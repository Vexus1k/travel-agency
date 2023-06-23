import { AngularFirestore, DocumentReference } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { IOffer } from "../../../core/interfaces";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private readonly _basePath = 'http://localhost:3000'

  constructor(
    private readonly _http: HttpClient,
    private readonly _afs: AngularFirestore
  ) {
  }

  public addOffer(offer: any, collectionName = '/Offers'): Promise<DocumentReference<any>> {
    return offer.id = this._afs.collection(collectionName).add(offer);
  }

  public deleteOffer(collectionName: string, elementId: string): Observable<IOffer> {
    const url = `${this._basePath}/delete/${collectionName}/${elementId}`;

    return this._http.delete(url);
  }
}
