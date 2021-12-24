import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MoviesListComponent
  },
  {
    path: 'detail/:id',
    component: MovieDetailComponent
  },
  {
    path: 'new',
    component: NewMovieComponent
  }
]

@NgModule({
  declarations: [
    MoviesListComponent,
    NewMovieComponent,
    MovieDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MoviesModule { }
