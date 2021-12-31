import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/core/api-services/movies.service';
import { Movie } from 'src/app/core/models/movies/movie.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  private page = 1;
  private limit = 5;
  constructor(private moviesService: MoviesService, private router: Router) { }
  public error = false;
  public errorMessage = 'ERROR.MOVIE_LIST_SERVICE';
  public movieList = Array<Movie>();
  public showMoreMoviesButton = true;
  private readonly subscriptions: Array<Subscription> = [];
  ngOnInit(): void {
    this.subscriptions.push(
      this.moviesService.getMoviesList(this.page, this.limit).subscribe((movies: Array<Movie>) => {
        this.movieList = movies;
        this.getNextList();
      }, error => {
        this.error = true;
      })
    );
  }
  public addMovie() {
    this.router.navigate(['movies/new'])
  }
  public openMovieDetail(movie: Movie) {
    this.router.navigate(['movies/detail/' + movie.id])
  }
  public recoverMoviesToList() {
    this.page++;
    this.subscriptions.push(
      this.moviesService.getMoviesList(this.page, this.limit).subscribe((movies: Array<Movie>) => {
        let movieListUpdate = this.movieList.concat(movies);
        this.movieList = movieListUpdate;
        this.getNextList();
      })
    );
  }

  private getNextList() {
    let nextPage = this.page + 1;
    this.subscriptions.push(
      this.moviesService.getMoviesList(nextPage, this.limit).subscribe((movies: Array<Movie>) => {
        if (movies.length === 0) {
          this.showMoreMoviesButton = false;
        }
      }, error => {
        this.showMoreMoviesButton = false;
      })
    );
  }
  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }
}
