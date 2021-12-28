import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkerService } from '../linker.service';
import { GenericRequest } from '../models/generic-request.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private readonly linkService: LinkerService) { }
  private moviesListUrl = 'movies';

  public getMoviesList(): Observable<any> {
    const service = this.moviesListUrl;
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
