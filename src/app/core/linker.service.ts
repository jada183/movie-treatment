import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericRequest } from './models/generic-request.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LinkerService {

  constructor(private http: HttpClient) { }

  private getEndPointUrl(service: any): string {
    const baseUrl = environment.apiUrl;
    const serviceUrl = service;

    return baseUrl + serviceUrl;
  }
  private getParams(params: any, httpParams?: HttpParams): HttpParams {
    httpParams = httpParams || new HttpParams();
    for (const property in params) {
      if (params[property] !== null  && typeof params[property] === 'object') {
        this.getParams(params[property], httpParams);
      } else {
        httpParams = httpParams.append(property, params[property]);
      }
    }
    return httpParams;
  }
  getModel(genericRequest: GenericRequest): Observable<Object> {
    return this.http.get<Object>(
      this.getEndPointUrl(genericRequest.getService()),
      {
        observe: 'body',
        params: this.getParams(genericRequest.getParams())
      }
    );
  }
  postModel(genericRequest: GenericRequest): Observable<Object> {
    return this.http.post<Object>(
      this.getEndPointUrl(genericRequest.getService()),
      {
        observe: 'body',
        params: this.getParams(genericRequest.getParams())
      }
    );
  }
}
