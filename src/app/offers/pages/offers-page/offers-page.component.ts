import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DataService } from "../../../core/services/DataService";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from "../../../core/services/NotificationService";
import { OfferStoreService } from "../../core/services/OfferStoreService";
import { IOffer } from "../../../core/interfaces";
import { ActivatedRoute } from "@angular/router";
import { forkJoin } from "rxjs";
import { finalize } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { isEqual } from 'lodash';
import { IsInArrayPipe } from "../../core/pipes/is-in-array.pipe";

@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    IsInArrayPipe
  ]
})
export class OffersPageComponent {
  public pickedFileFromAddModal: File;
  public pickedFileFromEditModal: File;
  public localStorageRef = localStorage;
  public offers!: IOffer[];
  public mostPickedPlaces!: IOffer[];
  public addOfferForm: FormGroup;
  public editOfferForm: FormGroup;
  public urlForEditModal: string;
  public oldEditedValue: IOffer;
  public peopleCountFotEditModal: number;

  public constructor(
    private readonly _dataService: DataService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _formBuilder: FormBuilder,
    private readonly _notificationsService: NotificationService,
    private readonly _offerStoreService: OfferStoreService,
    private readonly _route: ActivatedRoute,
    private readonly _firestore: AngularFirestore,
    private readonly _isInArray: IsInArrayPipe
  ) {
    this.addOfferForm = this._formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      url: new FormControl(null),
      allInclusive: new FormControl(false),
      sightseeingPlan: new FormControl(''),
      price: new FormControl(null),
      day: new FormControl(null),
    });

    this.editOfferForm = this._formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      url: new FormControl(null),
      allInclusive: new FormControl(false),
      peopleCount: new FormControl(null),
      sightseeingPlan: new FormControl(''),
      price: new FormControl(null),
      day: new FormControl(null),
    });

    [this.offers, this.mostPickedPlaces] = this._route.snapshot.data['offers'];
    this.offers = this.offers.concat(this.mostPickedPlaces);
  }

  public getFile(event: any, editModal = false): void {
    if (!editModal) {
      this.pickedFileFromAddModal = event?.target?.files[0];
    } else {
      this.pickedFileFromEditModal = event?.target?.files[0];
    }
  }

  public addOffer(): void {
    const formValue = this.addOfferForm.value;
    formValue.peopleCount = 1;

    if (formValue?.sightseeingPlan) {
      formValue.sightseeingPlan = formValue.sightseeingPlan?.split(",").map((item: string) => item.trim());
    }

    if (this.pickedFileFromAddModal) {
      this._dataService.addPhotoToCloudinary(this.pickedFileFromAddModal).subscribe((res) => {
        formValue.url = res?.['url'];

        this.addOfferProcess(formValue);
      });
    } else {
      this.addOfferProcess(formValue);
    }
  }

  public deleteOffer(offer: IOffer, notification = true, dbName = 'Offers'): void {
    this._firestore.collection(dbName).get().toPromise().then((querySnapshot) => {
      querySnapshot.forEach((document) => {
        if (offer.id && !document.data().hasOwnProperty('id')) {
          const { id, ...updatedOffer } = offer;
          offer = updatedOffer;
        }

        if (isEqual(offer, document.data())) {
          this._dataService.deleteOfferr(dbName, document.id).pipe(finalize(() => {
            // sub.unsubscribe(); // No need to unsubscribe from a non-existing subscription
          })).subscribe(() => {
            this.offers.forEach((a, index) => {

              if (a.id && !offer.hasOwnProperty('id')) {
                const { id, ...updatedOffer } = a;
                a = updatedOffer;
              }

              if (isEqual(offer, a)) {
                this.offers.splice(index, 1);
              }
            });

            if (notification) {
              this._notificationsService.pushSuccess('Offer deleted', 'Offer was deleted successfully.');
            }
            this._cdr.detectChanges();
          }, () => {
            if (notification) {
              this._notificationsService.pushSuccess('Deleting error', 'Something went wrong. Try again later.');
            }
          });
        }
      });
    }).catch((error) => {
      console.log('Error getting documents:', error);
    });

  }

  public addToOfferShopBox(offer: IOffer): void {
    this._offerStoreService.addOffer = offer;
    this._notificationsService.pushSuccess('Offer added', 'Offer was added to shopping cart successfully.')
  }

  public getTransportType(peopleCount: number): string {
    if (peopleCount >= 1 && peopleCount <= 5) {
      return 'Car';
    } else if (peopleCount >= 6 && peopleCount <= 20) {
      return 'Bus';
    } else if (peopleCount >= 21 && peopleCount <= 50) {
      return 'Coach';
    } else if (peopleCount > 50) {
      return 'Airplane';
    } else {
      return '-';
    }
  }

  public getAllOffers(): void {
    forkJoin(
      this._dataService.getAllDataFromDB('Offers'),
      this._dataService.getAllDataFromDB('Most-Picked-Places'),
    ).pipe(finalize(() => {
      this._cdr.detectChanges();
    })).subscribe((res) => {
      [this.offers, this.mostPickedPlaces] = res;
      this.offers = this.offers.concat(this.mostPickedPlaces);
    });
  }

  public editOffer(): void {
    const formValue = this.editOfferForm.value;

    if (typeof formValue?.sightseeingPlan === 'string') {
      formValue.sightseeingPlan = formValue?.sightseeingPlan?.split(",").map((item: string) => item.trim());
    }

    if (this.pickedFileFromEditModal || !!this.urlForEditModal) {
      if (!!this.urlForEditModal && !this.pickedFileFromEditModal) {
        formValue.url = this.urlForEditModal;

        this.pickedFileFromEditModal = null;
        this._notificationsService.pushSuccess('Offer edited', 'Offer was edited successfully.');
        this.editOfferProcess(formValue);
      } else {
        this._dataService.addPhotoToCloudinary(this.pickedFileFromEditModal).subscribe((res) => {
          formValue.url = res?.['url'];

          this.editOfferProcess(formValue);
          this.pickedFileFromEditModal = null;
          this._notificationsService.pushSuccess('Offer edited', 'Offer was edited successfully.');
        });
      }
    } else {
      delete formValue.url;
      this.editOfferProcess(formValue);
      this.pickedFileFromEditModal = null;
      this._notificationsService.pushSuccess('Offer edited', 'Offer was edited successfully.');
    }
  }

  public resetAddOfferForm(): void {
    this.addOfferForm.reset({
      name: '',
      description: '',
      url: null,
      allInclusive: false,
      sightseeingPlan: '',
      price: null,
      day: null,
    });
  }

  public setEditFormValues(offer: IOffer): void {
    this.oldEditedValue = null;
    this.urlForEditModal = null;

    this.editOfferForm.setValue({
      name: offer?.name || '',
      description: offer?.description || '',
      url: null,
      allInclusive: offer?.allInclusive || false,
      sightseeingPlan: offer?.sightseeingPlan || null,
      peopleCount: offer?.peopleCount || null,
      price: offer?.price || null,
      day: offer?.day || null,
    });

    if (offer?.url) {
      this.urlForEditModal = offer?.url;
    }

    if (offer?.peopleCount) {
      this.peopleCountFotEditModal = offer?.peopleCount;
    }

    this.oldEditedValue = offer;
  }

  private addOfferProcess(formValue: IOffer): void {
    this._dataService.addOffer(formValue).then(() => {
      this.pickedFileFromAddModal = null;
      this._notificationsService.pushSuccess('Offer added', 'Offer was added successfully.');
      this.resetAddOfferForm();
      this.offers.unshift(formValue);
      this._cdr.detectChanges();
    });
  }

  private editOfferProcess(formValue: IOffer): void {
    this.deleteOffer(
      this.oldEditedValue,
      false,
      this._isInArray.transform(this.oldEditedValue, this.mostPickedPlaces) ? 'Most-Picked-Places' : 'Offers'
    );
    this._dataService.addOffer(
      formValue,
      this._isInArray.transform(this.oldEditedValue, this.mostPickedPlaces) ? '/Most-Picked-Places' : '/Offers'
    ).then(() => {
      const index = this.offers.findIndex((item) => isEqual(item, this.oldEditedValue));
      if (index !== -1) {
        this.offers[index] = formValue;
      }

      if (this._isInArray.transform(this.oldEditedValue, this.mostPickedPlaces)) {
        const index = this.mostPickedPlaces.findIndex((item) => isEqual(item, this.oldEditedValue));
        if (index !== -1) {
          this.mostPickedPlaces[index] = formValue;
        }
      }
    });
  }
}
