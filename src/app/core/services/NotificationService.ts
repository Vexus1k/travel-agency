import { Injectable } from "@angular/core";
import { ActiveToast, ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public constructor(
    private readonly _toastrService: ToastrService
  ) {}

  public pushSuccess(title?: string, message?: string): ActiveToast<any> {
    return this._toastrService.success(message, title);
  }

  public pushError(title?: string, message?: string): ActiveToast<any> {
    return this._toastrService.error(message, title);
  }

  public pushInfo(title?: string, message?: string): ActiveToast<any> {
    return this._toastrService.warning(message, title);
  }

  public pushWarning(title?: string, message?: string): ActiveToast<any> {
    return this._toastrService.info(message, title);
  }
}
