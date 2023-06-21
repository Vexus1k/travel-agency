import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentChangeAction, DocumentReference } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { NotificationService } from "./NotificationService";
import { cloudName, uploadPreset } from "../../../../keys";
import { IOffer } from "../interfaces";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly _baseApiPath = 'http://localhost:3000'

  constructor(
    private readonly _afs: AngularFirestore,
    private readonly _http: HttpClient,
    private readonly _notificationService: NotificationService
  ) {
  }

  public getAllDataFromDB(databaseName: string): Observable<any> {
    const params = new HttpParams().set('databaseName', databaseName);
    return this._http.get(`${this._baseApiPath}/getDataFromFirebaseDB`, {params});
  }

  public addPhotoToCloudinary(file: File): Observable<object> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName)

    return this._http.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData);
  }

  public addOffer(offer: any, collectionName = '/Offers'): Promise<DocumentReference<any>> {
    return offer.id = this._afs.collection(collectionName).add(offer);
  }

  public editOffer(collectionName: string, elementId: string, offer: IOffer): void {
    this.deleteOfferr(collectionName, elementId).subscribe();
    this.addOffer(offer, '/' + collectionName);
  }

  public deleteOffer(offer: IOffer): Promise<void> {
    return this._afs.doc('/Offers/' + offer?.id).delete();
  }

  public deleteOfferr(collectionName: string, elementId: string): Observable<IOffer> {
    const url = `${this._baseApiPath}/delete/${collectionName}/${elementId}`;

    return this._http.delete(url);
  }
}
