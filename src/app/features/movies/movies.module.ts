import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';



@NgModule({
  declarations: [
    MoviesListComponent,
    NewMovieComponent,
    MovieDetailComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class MoviesModule { }
