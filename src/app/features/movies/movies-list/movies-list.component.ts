import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/api-services/movies.service';
import { Movie } from 'src/app/core/models/movies/movie.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  constructor(private moviesService: MoviesService) { }
  public error = false;
  public errorMessage = 'ERROR.MOVIE_LIST_SERVICE';
  ngOnInit(): void {
    this.moviesService.getMoviesList().subscribe((movies: Array<Movie>) => {
      console.log(movies);
    }, error => {
      this.error = true;
    });
  }

}
