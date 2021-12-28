import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { HttpHeadersEnum } from '../enums/http-headers.enum';
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
    if(req.headers.has(HttpHeadersEnum.spinner)) {
      this.spinnerFullOverlayService.show();
    }
    return next.handle(req).pipe(
      filter((res) => res.type !== 0),
      map((res) => {
        if(req.headers.has(HttpHeadersEnum.spinner)) {
          this.spinnerFullOverlayService.hide();
        }
        return res;
      }),
      catchError((error: HttpErrorResponse) => {         
        if(req.headers.has(HttpHeadersEnum.spinner)) {
          this.spinnerFullOverlayService.hide();
        }
        return throwError(error);
      })
    );
  }
}
