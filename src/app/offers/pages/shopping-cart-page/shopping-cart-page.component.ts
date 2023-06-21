import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OfferStoreService } from "../../core/services/OfferStoreService";
import { NotificationService } from "../../../core/services/NotificationService";
import { DataService } from "../../../core/services/DataService";
import { IOffer } from "../../../core/interfaces";
import * as emailJS from "emailjs-com";
import { FormBuilder, FormGroup } from "@angular/forms";
import { serviceId, templateIdShopping, userId } from "../../../../../keys";
import { IsInArrayPipe } from "../../core/pipes/is-in-array.pipe";
import { isEqual } from "lodash";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    IsInArrayPipe
  ]
})
export class ShoppingCartPageComponent implements OnInit {
  public offersStored: IOffer[];
  public emailForm: FormGroup;
  public offers!: IOffer[];
  public mostPickedPlaces!: IOffer[];

  constructor(
    private readonly _offerStoreService: OfferStoreService,
    private readonly _notificationsService: NotificationService,
    private readonly _dataService: DataService,
    private readonly _fb: FormBuilder,
    private readonly _firestore: AngularFirestore,
    private readonly _isInArray: IsInArrayPipe,
    private readonly _route: ActivatedRoute
  ) {
    this.emailForm = this._fb.group({
      name: [''],
      surname: [''],
      email: ['']
    });

    [this.offers, this.mostPickedPlaces] = this._route.snapshot.data['offers'];
    this.offers = this.offers.concat(this.mostPickedPlaces);
  }

  public ngOnInit(): void {
    this.offersStored = this._offerStoreService.getOffers;
  }

  public sendEmail(): void {
    const formValue = this.emailForm.value;
    const newOffers: string[] = [];

    this.offersStored.forEach((res) => {
      newOffers.push(res.name);
    })

    const emailParams = {
      to_email: formValue.email,
      to_name: formValue.name+ ' ' + formValue.surname,
      from_name: 'Travel agency',
      message: newOffers.join('\n')
    };

    emailJS.send(serviceId, templateIdShopping, emailParams, userId)
      .then(() => {
        this._notificationsService.pushSuccess('Purchase done',
          'The message with the ordered offers should be in your email in a moment.');
      }, () => {
        this._notificationsService.pushError('Sending error',
          'There was an error sending the email, please try again.');
      });

    this.purchaseOffer();
    this.resetEmailOfferForm();
  }

  public resetEmailOfferForm(): void {
    this.emailForm.reset({
      name: '',
      description: '',
      url: null,
      allInclusive: false,
      sightseeingPlan: '',
      price: null,
      day: null,
    });
  }

  public purchaseOffer(): void {
    const counts: { [key: string]: number } = {};

    for (const obj of this.offersStored) {
      const objString = JSON.stringify(obj);
      counts[objString] = (counts[objString] || 0) + 1;
    }

    for (const [objString, count] of Object.entries(counts)) {
      let offer = JSON.parse(objString);
      let dbName = (this._isInArray.transform(offer, this.mostPickedPlaces)) ? 'Most-Picked-Places' : 'Offers';

      this._firestore.collection(dbName).get().toPromise().then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          if (offer.id && !document.data().hasOwnProperty('id')) {
            const { id, ...updatedOffer } = offer;
            offer = updatedOffer;
          }

          if (isEqual(offer, document.data())) {
            this._dataService.deleteOffer(dbName, document.id).subscribe();

            if (offer?.peopleCount) {
              this._dataService.addOffer({...offer, peopleCount: (+offer.peopleCount + +count).toString() }, dbName);
            } else {
              this._dataService.addOffer({...offer, peopleCount: count.toString() }, dbName);
            }
          }
        });
      }).catch((error) => {
        console.log('Error getting documents:', error);
        this._notificationsService.pushError('Error while buying', 'Something went wrong try again later.')
      });
    }

    this._offerStoreService.clearOffers();
    this.offersStored = [];
  }

  public deleteOfferFromShopBox(offers: any[], index: number): void {
    this._offerStoreService.removeOffer(offers, index);
    this.offersStored = this._offerStoreService.getOffers;
  }
}
