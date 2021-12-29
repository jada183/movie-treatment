import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/api-services/movies.service';
import { Movie } from 'src/app/core/models/movies/movie.model';
import { FormGroup, FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
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

  public actorList = [
    {first_name: "Will Smith", id: 1},
  ]
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
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
