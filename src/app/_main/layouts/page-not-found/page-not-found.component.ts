import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../core/services/NotificationService";
import { Location } from "@angular/common";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private readonly _notificationService: NotificationService,
    private readonly _location: Location
  ) { }

  public ngOnInit(): void {
    this._notificationService.pushError('Page Not Found',
      'Page was not found. Click somewhere to come back.');
  }

  public goBack(): void {
    this._location.back();
  }
}
