import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MoviesService } from 'src/app/core/api-services/movies.service';
import { of } from 'rxjs'
import { NewMovieComponent } from './new-movie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Movie } from 'src/app/core/models/movies/movie.model';
import { StudioService } from 'src/app/core/api-services/studio.service';
class RouterMock {
  navigate() { }
}
class ActivatedRouteMock {
  snapshot = {
    paramMap: convertToParamMap({ id: 1 })
  }
}
const movieMock = {
  id: 1,
  title: "Dancing Lady",
  poster: "http://dummyimage.com/400x600.png/cc0000/ffffff",
  genre: [
    "Comedy",
    "Musical",
    "Romance"
  ],
  year: 2006,
  duration: 161,
  imdbRating: 8.27,
  actors: [
      4,
      5,
      6
  ]
}
class movieServiceStub {
  getMovie(id: Number) {
    return of(movieMock);
  }
  postMovie(movie: Movie) {
    return of(movieMock);
  }
  putMovie(movie: Movie,id: number) {
    return of(movieMock);
  }
}
class studioServiceStub {
  getStudioList() {
    return of([{
      "id": 1,
      "name": "Jacobson-Dickinson",
      "country": "Colombia",
      "createYear": 2010,
      "employees": 81,
      "rating": 4.32,
      "movies": [
        1,
        10
      ]
    }]);
  }
  putStudio(movie: Movie,id: number) {
    return of({
      "id": 1,
      "name": "Jacobson-Dickinson",
      "country": "Colombia",
      "createYear": 2010,
      "employees": 81,
      "rating": 4.32,
      "movies": [
        1,
        10
      ]
    });
  }
}
describe('NewMovieComponent', () => {
  let component: NewMovieComponent;
  let fixture: ComponentFixture<NewMovieComponent>;

  beforeEach(() => {
    const translateServiceStub = () => ({
      instant: () => ({})
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NewMovieComponent],
      providers: [
        { provide: TranslateService, useFactory: translateServiceStub },
        { provide: Router, useClass: RouterMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: MoviesService, useClass: movieServiceStub },
        { provide: StudioService, useClass: studioServiceStub }
      ]
    })
    fixture = TestBed.createComponent(NewMovieComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
