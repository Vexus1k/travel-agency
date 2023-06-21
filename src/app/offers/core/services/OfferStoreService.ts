import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IOffer } from "../../../core/interfaces/IOffer";

@Injectable({
  providedIn: 'root'
})
export class OfferStoreService {
  private _offers: IOffer[] = [];
  private _offersSubject$ = new Subject<IOffer[]>();

  public set addOffer(offer: IOffer) {
    this._offers.push(offer);
    this._offersSubject$.next(this._offers);
  }

  public get getOffers(): IOffer[] {
    return this._offers;
  }

  public clearOffers(): void {
    this._offers = [];
    this._offersSubject$.next(this._offers);
  }

  public removeOffer(offers: IOffer[], index: number): void {
    offers.splice(index, 1);
    this._offersSubject$.next(this._offers);
  }
}
