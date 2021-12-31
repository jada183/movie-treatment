import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkerService } from '../linker.service';
import { GenericRequest } from '../models/generic-request.model';
import { Movie } from '../models/movies/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private readonly linkService: LinkerService) { }
  private moviesListUrl = 'movies';

  public getMoviesList(page: number, limit:number): Observable<any> {
    let params: any = {
      _page: page,
      _limit: limit,
    }
    const service = this.moviesListUrl;
    const genericRequest = new GenericRequest(
      Object.assign(
        service,
        {}),
      {},
      {},
      params
    );
    return this.linkService.getModel(genericRequest)
  }

  public getMovieById(id: number): Observable<any> {
    const service = this.moviesListUrl + '/' + id;
    const genericRequest = new GenericRequest(
      Object.assign(
        service,
        {}),
      {},
      {}
    );
    return this.linkService.getModel(genericRequest)
  }

  public postMovie(movie: Movie) {
    const service = this.moviesListUrl;
    const genericRequest = new GenericRequest(
      Object.assign(
        service,
        {}),
      {},
      movie
    );
    return this.linkService.postModel(genericRequest)
  }
  public putMovie(movie: Movie, movieId: number) {
    const service = this.moviesListUrl + '/' + movieId;
    const genericRequest = new GenericRequest(
      Object.assign(
        service,
        {}),
      {},
      movie
    );
    return this.linkService.putModel(genericRequest)
  }
  public deleteMovie(movieId: number) {
    const service = this.moviesListUrl + '/' + movieId;
    const genericRequest = new GenericRequest(
      Object.assign(
        service,
        {}),
      {},
      {}
    );
    return this.linkService.deleteModel(genericRequest)
  }
}
