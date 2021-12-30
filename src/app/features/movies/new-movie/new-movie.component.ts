import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/api-services/movies.service';
import { Movie } from 'src/app/core/models/movies/movie.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActorService } from 'src/app/core/api-services/actor.service';
import { Actor } from 'src/app/core/models/movies/actor.model';
import { Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { StudioService } from 'src/app/core/api-services/studio.service';
import { Studio } from 'src/app/core/models/movies/studio.model';
@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.scss']
})
export class NewMovieComponent implements OnInit, OnDestroy {
  movieForm = new FormGroup({
    title: new FormControl('', Validators.required),
    poster: new FormControl('', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[-a-zA-Z0-9@:%_\+.~#?&//=]*/?')),
    year: new FormControl('', [Validators.required, Validators.min(1850), Validators.max(2100)]),
    duration: new FormControl('', [Validators.required, Validators.min(1), Validators.max(1000)]),
    imdbRating: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10)]),
    studio: new FormControl('', [Validators.required]),
    genre: new FormControl([], [Validators.required]),
    actors: new FormControl([]),
    actor: new FormControl('')
  });
  public studios = [];
  public genders = [];
  public actors = [];

  public actorList = [];
  public studioList = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private readonly subscriptions: Array<Subscription> = [];

  public errorMessage = '';
  public error = false;
  constructor(
    private moviesService: MoviesService,
    private actorService: ActorService,
    private router: Router,
    private studioService: StudioService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      forkJoin([this.actorService.getActorList(), this.studioService.getStudioList()]).subscribe((value: [Array<Actor>, Array<Studio>]) => {
        const [actorList, studioList] = value;
        this.actorList = actorList;
        this.studios = studioList;
      })
    );
  }

  private addMovie() {
    const newMovie = this.buildMovie();
    this.subscriptions.push(
      this.moviesService.postMovie(newMovie).subscribe(result => {
        this.updateStudioInfo(result['id']);
      }, error => {
        this.error = true;
        this.errorMessage = 'ERROR.ADD_MOVIE_SERVICE';
      })
    );
  }
  public onSubmit() {
    this.addMovie();
  }
  public removeGender(gender: any): void {
    const index = this.genders.indexOf(gender);
    if (index >= 0) {
      this.genders.splice(index, 1);
    }
  }
  public addGender(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add gender
    if ((value || '').trim()) {
      this.genders.push(value.trim());
    }
    // Add array value to genre formcontrol
    this.movieForm.get('genre').setValue(this.genders);
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  public removeActor(actor: any): void {
    const index = this.actors.indexOf(actor);
    if (index >= 0) {
      this.actors.splice(index, 1);
    }
  }
  public addActor(actor: any): void {
    if (this.actors.find(act => act.id === actor.id) === undefined) {
      this.actors.push(actor);
      this.movieForm.get('actors').setValue(this.actors.map(actor => actor.id));
    }
    this.movieForm.get('actor').setValue('');
  }
  public buildMovie(): Movie {
    const movie: Movie = {
      title: this.movieForm.get('title').value,
      poster: this.movieForm.get('poster').value,
      genre: this.movieForm.get('genre').value,
      year: this.movieForm.get('year').value,
      duration: this.movieForm.get('duration').value,
      imdbRating: this.movieForm.get('imdbRating').value,
      actors: this.movieForm.get('actors').value
    }
    return movie;
  }
  public resetForm() {
    this.movieForm.reset();
    this.actors = [];
    this.genders = [];
  }
  public updateStudioInfo(movieId: number) {
    const selectedStudio = this.movieForm.get('studio').value;
    selectedStudio.movies.push(movieId);
    this.subscriptions.push(
      this.studioService.putStudio(selectedStudio, selectedStudio.id).subscribe(result => {
        this.router.navigate(['/movie']);
      }, error => {
        this.error = true;
        this.errorMessage = 'ERROR.PUT_STUDIO';
      })
    );
  }
  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }
} 
