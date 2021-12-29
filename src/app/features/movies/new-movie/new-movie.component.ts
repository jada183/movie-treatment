import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/api-services/movies.service';
import { Movie } from 'src/app/core/models/movies/movie.model';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.scss']
})
export class NewMovieComponent implements OnInit {
  movieForm = new FormGroup({
    title: new FormControl(''),
    poster: new FormControl(''),
    year: new FormControl(''),
    duration: new FormControl(''),
    imdbRating: new FormControl('')
  });

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    const movieMocked =  {
      "title": "Dancing Lady",
      "poster": "http://dummyimage.com/400x600.png/cc0000/ffffff",
      "genre": ["Comedy", "Musical", "Romance"],
      "year": 2006,
      "duration": 161,
      "imdbRating": 8.27,
      "actors": [4, 5, 6]
    };
    // this.addMovie(movieMocked);
  }

  private addMovie(newMovie: Movie) {
    this.moviesService.postMovie(newMovie).subscribe(result => {
      console.log(result);
    });
  }
}
