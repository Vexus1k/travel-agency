import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { DataService } from "../../../core/services/DataService";
import { IMostPickedPlaces } from "../../core/interfaces";
import { ISliderImage } from "../../core/interfaces";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnDestroy {
  public selectedIndex = 0;
  public images!: ISliderImage[];
  public mostPickedPlacesList!: IMostPickedPlaces[];

  private _interval= setInterval(() => {
    this.nextClick(false);
  }, 8000);

  constructor(
    private readonly _dataService: DataService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _route: ActivatedRoute
  ) {
    [this.images, this.mostPickedPlacesList] = this._route.snapshot.data['dashboard'];
  }

  public prevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex --;
    }

    clearInterval(this._interval);
    this._interval = setInterval(() => {
      this.nextClick();
    }, 8000);
  }

  public nextClick(isSetInterval = true): void {
    if (this.selectedIndex === this.images?.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }

    if (isSetInterval) {
      clearInterval(this._interval);
      this._interval = setInterval(() => {
        this.nextClick();
      }, 8000);
    }

    this._cdr.detectChanges();
  }

  public ngOnDestroy(): void {
    clearInterval(this._interval);
  }
}
