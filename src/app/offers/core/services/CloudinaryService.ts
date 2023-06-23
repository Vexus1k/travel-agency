import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NotificationService } from "../../../core/services/NotificationService";
import { Observable } from "rxjs";
import { cloudName, uploadPreset } from "../../../../../keys";


@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private readonly _basePath = `https://api.cloudinary.com/v1_1/${cloudName}`;

  constructor(
    private readonly _http: HttpClient,
    private readonly _notificationService: NotificationService
  ) {
  }

  public addPhotoToCloudinary(file: File): Observable<object> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName)

    return this._http.post(`${this._basePath}/upload`, formData);
  }
}
