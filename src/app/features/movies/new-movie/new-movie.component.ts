import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/api-services/movies.service';
import { Movie } from 'src/app/core/models/movies/movie.model';
import { FormGroup, FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActorService } from 'src/app/core/api-services/actor.service';
import { Actor } from 'src/app/core/models/movies/actor.model';
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
    imdbRating: new FormControl(''),
    studio: new FormControl(''),
    genre: new FormControl([]),
    actors: new FormControl([]),
    actor: new FormControl('')
  });
  public studios = [
    {name: 'prueba'}
  ];
  public genders = [];
  public actors = [];

  public actorList = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private moviesService: MoviesService, private actorService: ActorService) { }

  ngOnInit(): void {
    this.actorService.getActorList().subscribe((actorList: Array<Actor>) => {
      this.actorList = actorList;
    });
  }

  private addMovie(newMovie: Movie) {
    this.moviesService.postMovie(newMovie).subscribe(result => {
      console.log(result);
    });
  }
  public onSubmit() {
    console.log(this.movieForm.value);
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
      this.genders.push( value.trim());
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
    if(this.actors.find(act =>  act.id === actor.id ) === undefined) {
      this.actors.push(actor);
      this.movieForm.get('actors').setValue(this.actors.map(actor => actor.id));
    }
    this.movieForm.get('actor').setValue('');
  }
}
