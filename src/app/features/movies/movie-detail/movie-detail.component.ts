import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { ActorService } from 'src/app/core/api-services/actor.service';
import { MoviesService } from 'src/app/core/api-services/movies.service';
import { Actor } from 'src/app/core/models/movies/actor.model';
import { Movie } from 'src/app/core/models/movies/movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  constructor(private readonly route: ActivatedRoute, private moviesService: MoviesService, private  actorService: ActorService) { }
  private movieId: any;
  public error = false;
  public errorMessage = '';
  private actorsList = [];
  public movie: Movie;
  private readonly subscriptions: Array<Subscription> = [];
  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.getMovie();
  }

  private getMovie() {
    if (this.movieId) {
      this.moviesService.getMovieById(this.movieId).subscribe((movie: Movie) => {
        this.movie = movie;
        this.loadActors();
      }, error => {
        this.error = true;
        this.errorMessage = 'ERROR.PUT_MOVIE_SERVICE'
      });
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
  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }
  private loadActors() {
    this.actorService.getActorList().subscribe( (actors:Array<Actor>) => {
      console.log('actors:', actors);
      this.actorsList = actors;
    })
  }
  public getActorById(id: number): Actor {
    if(this.actorsList) {
      return this.actorsList.find(a => a.id === id)? this.actorsList.find(a => a.id === id) : undefined;
    }
  }
}
