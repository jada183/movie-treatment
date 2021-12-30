import { Injectable } from "@angular/core";
import { Query, Store, StoreConfig } from "@datorama/akita";
import { Observable } from "rxjs";

export interface MovieFormState {
    title: string;
    poster: string;
    year: number;
    duration: number;
    imdbRating: number;
    studio: string;
    genre: Array<string>;
    actors: Array<number>;
}
export function createInitialMovieForm(): MovieFormState {
    return {
        title: '',
        poster: '',
        year: undefined,
        duration: undefined,
        imdbRating: undefined,
        studio: '',
        genre: [],
        actors: []
    }
}

@Injectable({ providedIn: 'root'})
@StoreConfig({name: 'movieForm'})
export class MovieFormStore extends Store<MovieFormState> {
    constructor() {
        super(createInitialMovieForm());
    }
    setMovieForm(movieForm: MovieFormState) {
        this.update(movieForm);
    }
    resetMovieForm() {
        this.update(createInitialMovieForm());
    }
}

@Injectable({ providedIn: 'root'})
export class MovieFQuery extends Query<MovieFormState> {
    getMovieForm$: Observable<MovieFormState> = this.select(
        (state: MovieFormState) => state
    );
    constructor(protected store: MovieFormStore){
        super(store);
    }
}