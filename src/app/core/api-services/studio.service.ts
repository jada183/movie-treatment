import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkerService } from '../linker.service';
import { GenericRequest } from '../models/generic-request.model';
import { Studio } from '../models/movies/studio.model';

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
  public putStudio(studio: Studio, studioId: number) {
    const service = this.studioListUrl + '/' + studioId;
    const genericRequest = new GenericRequest(
      Object.assign(
        service,
        {}),
      {},
      studio
    );
    return this.linkService.putModel(genericRequest)
  }
}
