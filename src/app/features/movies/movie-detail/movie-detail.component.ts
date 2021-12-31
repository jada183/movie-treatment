import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActorService } from 'src/app/core/api-services/actor.service';
import { MoviesService } from 'src/app/core/api-services/movies.service';
import { StudioService } from 'src/app/core/api-services/studio.service';
import { Actor } from 'src/app/core/models/movies/actor.model';
import { Movie } from 'src/app/core/models/movies/movie.model';
import { Studio } from 'src/app/core/models/movies/studio.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private moviesService: MoviesService,
    private actorService: ActorService,
    private studioService: StudioService,
    private router: Router) { }
  private movieId: any;
  public error = false;
  public errorMessage = '';
  private actorsList = [];
  public selectedStudio: Studio;
  public movie: Movie;
  private readonly subscriptions: Array<Subscription> = [];
  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.getMovie();
  }

  private getMovie() {
    if (this.movieId) {
      this.subscriptions.push(
        this.moviesService.getMovieById(this.movieId).subscribe((movie: Movie) => {
          this.movie = movie;
          this.loadActors();
          this.loadStudio();
        }, error => {
          this.error = true;
          this.errorMessage = 'ERROR.PUT_MOVIE_SERVICE'
        })
      );
    }

  }
  public editMovie() {
    this.router.navigate(['/movies/edit/' + this.movieId]);
  }
  public deleteMovie() {
    this.subscriptions.push(
      this.moviesService.deleteMovie(this.movieId).subscribe(result => {
        this.router.navigate(['/movies'])
      }, error=> {
        this.error = true;
        this.errorMessage = "ERROR.REMOVE_MOVIE_SERVICE";
      })
    );
  }
  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }
  private loadActors() {
    this.subscriptions.push(
      this.actorService.getActorList().subscribe((actors: Array<Actor>) => {
        this.actorsList = actors;
      })
    );
  }
  public getActorById(id: number): Actor {
    if (this.actorsList) {
      return this.actorsList.find(a => a.id === id) ? this.actorsList.find(a => a.id === id) : undefined;
    }
  }
  private loadStudio() {
    this.subscriptions.push(
      this.studioService.getStudioList().subscribe((studios: Array<Studio>) => {
        this.selectedStudio = studios.find(s => s.movies.includes(+this.movieId));
      })
    );
  }
}
