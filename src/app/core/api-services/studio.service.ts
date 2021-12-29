import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkerService } from '../linker.service';
import { GenericRequest } from '../models/generic-request.model';

@Injectable({
  providedIn: 'root'
})
export class StudioService {

  constructor(private readonly linkService: LinkerService) { }
  private studioListUrl = 'companies';

  public getStudioList(): Observable<any> {
    const service = this.studioListUrl;
    const genericRequest = new GenericRequest(
      Object.assign(
        service,
        {}),
      {},
      {}
    );
    return this.linkService.getModel(genericRequest)
  }
}
