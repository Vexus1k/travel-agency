import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from "../services/LoadingService";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private _totalRequests = 0;

  constructor(
    private readonly _loadingService: LoadingService
  ) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._totalRequests++;
    this._loadingService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this._totalRequests--;
        if (this._totalRequests == 0) {
          this._loadingService.setLoading(false);
        }
      })
    );
  }
}
