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
    if(this.movieId) {
      this.moviesService.getMovieById(this.movieId).subscribe((movie: Movie) => {
        console.log(movie);
      })
    }
  }

}
