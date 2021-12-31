import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/api-services/movies.service';
import { Movie } from 'src/app/core/models/movies/movie.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActorService } from 'src/app/core/api-services/actor.service';
import { Actor } from 'src/app/core/models/movies/actor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { StudioService } from 'src/app/core/api-services/studio.service';
import { Studio } from 'src/app/core/models/movies/studio.model';
import { MovieFQuery, MovieFormStore } from 'src/app/core/akita/movieForm.store';
import { first } from 'rxjs/operators';
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
    genre: new FormControl([]),
    actors: new FormControl([]),
    actor: new FormControl('')
  });
  public studios = [];
  public genders = [];
  public actors = [];

  public actorList = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private readonly subscriptions: Array<Subscription> = [];

  public errorMessage = '';
  public error = false;
  private movieId:any;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private actorService: ActorService,
    private router: Router,
    private studioService: StudioService,
    private movieFormQuery: MovieFQuery,
    private movieFormStore: MovieFormStore) { }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    if (!this.movieId) {
      this.updateFormStore();
    }
    this.subscriptions.push(
      forkJoin([this.actorService.getActorList(), this.studioService.getStudioList()]).subscribe((value: [Array<Actor>, Array<Studio>]) => {
        const [actorList, studioList] = value;
        this.actorList = actorList;
        this.studios = studioList;
        this.recoverForm();
      })
    );
  }
  private updateFormStore() {
    this.movieForm.valueChanges.subscribe(() => {
      this.saveFormInAkita();
    });
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
    if(!this.movieId) {
      this.addMovie();
    } else {
      this.updateMovie();
    }
    
  }
  public removeGender(gender: any): void {
    const index = this.genders.indexOf(gender);
    if (index >= 0) {
      this.genders.splice(index, 1);
    }
    this.movieForm.get('genre').setValue(this.genders);
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
    this.movieForm.get('actors').setValue(this.actors.map(actor => actor.id));
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
    if(!this.movieId) {
      this.movieFormStore.resetMovieForm();
      this.movieForm.reset();
      this.actors = [];
      this.genders = [];
    } else {
      this.router.navigate(['movies/detail/' + this.movieId])
    }
  }
  public updateStudioInfo(movieId: number) {
    const selectedStudio = this.movieForm.get('studio').value;
    selectedStudio.movies.push(movieId);
    this.subscriptions.push(
      this.studioService.putStudio(selectedStudio, selectedStudio.id).subscribe(result => {
        this.resetForm();
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
  private saveFormInAkita() {
    this.movieFormStore.setMovieForm(this.movieForm.value);
  }
  private recoverForm() {
    if(this.movieId) {
      this.moviesService.getMovieById(this.movieId).subscribe(movie => {
        this.fillForm(movie);
        this.loadActorsChips();
        this.setStudio();
        this.setGenreList();
      });
    } else {
      this.subscriptions.push(
        this.movieFormQuery.getMovieForm$.pipe(first()
         ).subscribe(result => {
          this.movieForm.setValue(result);
          this.loadActorsChips();
          this.setStudio();
          this.setGenreList();
        })
      );
    }
  }
  private loadActorsChips() {
    const movieActorIds: [] = this.movieForm.get('actors').value;
    if (movieActorIds !== null && movieActorIds.length > 0) {
      this.actorList.forEach(actor => {
        if (movieActorIds.find(id => id === actor.id)) {
          this.actors.push(actor);
        }
      });
    }
  }
  private setStudio() {
    if (this.movieForm.get('studio').value) {
      const selectedStudio = this.movieForm.get('studio').value;
      const studioToSet = this.studios.find(st => st.id === selectedStudio.id);
      this.movieForm.get('studio').setValue(studioToSet);
    }

  }
  private setGenreList() {
    if(this.movieForm.get('genre').value) {
      this.genders = [...this.movieForm.get('genre').value];
    }
  }
  private updateMovie() {
    const movie = this.buildMovie();
    this.subscriptions.push(
      this.moviesService.putMovie(movie, this.movieId).subscribe(movieUpdate => {
      })
    );
  }
  private fillForm(movie: Movie) {
    const studio = this.studios.find(st => st.movies.includes(+this.movieId))
    this.movieForm.get('studio').setValue(studio);
    this.movieForm.get('title').setValue(movie.title);
    this.movieForm.get('poster').setValue(movie.poster);
    this.movieForm.get('year').setValue(movie.year);
    this.movieForm.get('duration').setValue(movie.duration);
    this.movieForm.get('imdbRating').setValue(movie.imdbRating);
    this.movieForm.get('actors').setValue(movie.actors);
    this.movieForm.get('genre').setValue(movie.genre);
  }
} 
