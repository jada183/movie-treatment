import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/core/api-services/movies.service';
import { Movie } from 'src/app/core/models/movies/movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  constructor(private readonly route: ActivatedRoute, private moviesService: MoviesService) { }
  private movieId: any;
  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.getMovie();
    const movieMocked = {
      "title": "Dancing Lady",
      "poster": "http://dummyimage.com/400x600.png/cc0000/ffffff",
      "genre": ["Comedy", "Musical", "Drama"],
      "year": 2006,
      "duration": 161,
      "imdbRating": 8.27,
      "actors": [4, 5, 6]
    };
    // this.updateMovie(movieMocked);
  }

  private getMovie() {
    if (this.movieId) {
      this.moviesService.getMovieById(this.movieId).subscribe((movie: Movie) => {
        console.log(movie);
      })
    }
  }
  private updateMovie(movie: Movie) {
    if (this.movieId) {
      this.moviesService.putMovie(movie, this.movieId).subscribe(movieUpdate => {
        console.log(movieUpdate);
      })
    }
  }
  private deleteMovie(movieId: number) {
    this.moviesService.deleteMovie(movieId).subscribe(result =>  {
      console.log('delete result:', result);
    });
  }
}
