import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { SpinnerFullOverlayService } from '../spinner-full-overlay/spinner-full-overlay.service';

// XXX: declare this interceptor on main module as HTTP interceptor
@Injectable({
  providedIn: 'root',
})
export class HttpCommonInterceptor implements HttpInterceptor {
  // TODO: write tests
  constructor(
    private readonly spinnerFullOverlayService: SpinnerFullOverlayService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneHeaders: HttpHeaders = req.headers;
    if(req.headers.has('spinner')) {
      this.spinnerFullOverlayService.show();
    }
    const cloneReq = req.clone({});
    return next.handle(cloneReq).pipe(
      filter((res) => res !== undefined),
      map((res) => {
        this.spinnerFullOverlayService.hide();
        return res;
      })
    );
  }
}
