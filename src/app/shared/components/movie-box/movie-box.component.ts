import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movies/movie.model';

@Component({
  selector: 'app-movie-box',
  templateUrl: './movie-box.component.html',
  styleUrls: ['./movie-box.component.scss']
})
export class MovieBoxComponent implements OnInit {

  constructor() { }
  @Input() movie: Movie;
  ngOnInit(): void {
  }

}
