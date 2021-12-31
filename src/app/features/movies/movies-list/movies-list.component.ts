import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/core/api-services/movies.service';
import { Movie } from 'src/app/core/models/movies/movie.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  constructor(private moviesService: MoviesService, private router: Router) { }
  public error = false;
  public errorMessage = 'ERROR.MOVIE_LIST_SERVICE';
  public movieList = Array<Movie>();
  ngOnInit(): void {
    this.moviesService.getMoviesList().subscribe((movies: Array<Movie>) => {
      this.movieList = movies;
    }, error => {
      this.error = true;
    });
  }
  public addMovie() {
    this.router.navigate(['movies/new'])
  }
  public openMovieDetail(movie: Movie) {
    this.router.navigate(['movies/detail/'+ movie.id])
  }
}
