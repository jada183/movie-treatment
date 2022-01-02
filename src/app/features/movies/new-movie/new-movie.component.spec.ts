import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MoviesService } from 'src/app/core/api-services/movies.service';
import { of, throwError } from 'rxjs'
import { NewMovieComponent } from './new-movie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Movie } from 'src/app/core/models/movies/movie.model';
import { StudioService } from 'src/app/core/api-services/studio.service';
import { ActorService } from 'src/app/core/api-services/actor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieFQuery } from 'src/app/core/akita/movieForm.store';
class RouterMock {
  navigate() { }
}
class ActivatedRouteMock {
  snapshot = {
    paramMap: convertToParamMap({ id: 1 }),
    params: {
      id: 1
    }
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
  getMovieById(id: Number) {
    return of(movieMock);
  }
  postMovie(movie: Movie) {
    return of(movieMock);
  }
  putMovie(movie: Movie, id: number) {
    return of(movieMock);
  }
}
class MovieQueryStub {
  getMovieForm$ = of(
    {
      actor: null,
      actors: null,
      duration: null,
      genre: null,
      imdbRating: null,
      poster: null,
      studio: null,
      title: null,
      year: null
    },
  )
}
class actorServiceStub {
  getActorList() {
    return of([{
      "id": 1,
      "first_name": "Isaak",
      "last_name": "McQuode",
      "gender": "Male",
      "bornCity": "Ciduren",
      "birthdate": "24/12/1957",
      "img": "http://dummyimage.com/600x400.png/dddddd/000000",
      "rating": 2.03,
      "movies": [
        3,
        7
      ]
    }]
    )
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
  putStudio(movie: Movie, id: number) {
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

  beforeEach(async () => {
    const translateServiceStub = () => ({
      instant: () => ({})
    });
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NewMovieComponent],
      providers: [
        { provide: TranslateService, useFactory: translateServiceStub },
        { provide: Router, useClass: RouterMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: MoviesService, useClass: movieServiceStub },
        { provide: StudioService, useClass: studioServiceStub },
        { provide: ActorService, useClass: actorServiceStub },
        { provide: MovieFQuery, useClass: MovieQueryStub }
      ]
    })

  });
  describe('with urlparams', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NewMovieComponent);
      component = fixture.componentInstance;
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('ngOnInit', () => {
      component.ngOnInit();
      expect((component as any).movieId).toEqual(1);
    });
    it('onSubmit', () => {
      const spyUpdateMovie = spyOn(component as any, 'updateMovie');
      component.ngOnInit();
      component.onSubmit();
      expect(spyUpdateMovie).toHaveBeenCalled();
    });
    it('resetForm', () => {
      component.ngOnInit();
      component.resetForm();
      expect(component).toBeTruthy();
    });
    it('updateMovie', () => {
      (component as any).updateMovie();
      expect(component).toBeTruthy();
    });
  });
  describe('without urlparams', () => {
    beforeEach(() => {
      TestBed.overrideProvider(ActivatedRoute, {
        useValue: { snapshot: { paramMap: convertToParamMap({}), params: {} } }
      });
      TestBed.compileComponents();
      fixture = TestBed.createComponent(NewMovieComponent);
      component = fixture.componentInstance;
    });
    it('ngOnInit', () => {
      
      component.ngOnInit();
      expect((component as any).movieId).toEqual(null);
    });
    it('addMovie', () => {
      const spyUpdateStudioInfo = spyOn(component, 'updateStudioInfo');
      (component as any).addMovie();
      expect(spyUpdateStudioInfo).toHaveBeenCalled();
    });
    it('addMovie', () => {
      const moviesServiceStub = fixture.debugElement.injector.get<MoviesService>(
        MoviesService as any
      );
      spyOn(moviesServiceStub, 'postMovie').and.returnValue(throwError('error'));
      (component as any).addMovie();
      expect(component.error).toBeTruthy();
    });
    it('onSubmit', () => {
      const spyAddMovie = spyOn((component as any), 'addMovie');
      component.onSubmit();
      expect(spyAddMovie).toHaveBeenCalled();
    });
    it('removeGender', () => {
      component.genders = [
        'accion'
      ]
      component.removeGender('accion');
      expect(component.genders.length).toEqual(0);
    });
    it('removeGender case not found gender', () => {
      component.genders = [
        'a'
      ]
      component.removeGender('accion');
      expect(component.genders.length).toEqual(1);
    });
    it('addGender', () => {
      component.genders = [];
      // TODO get a htmlInputElement 
      component.addGender({input: undefined, value: 'accion'});
      expect(component.genders.length).toEqual(1);
    });
    it('removeActor', () => {
      const mockActorToRemove = {
        "id": 1,
        "first_name": "Isaak",
        "last_name": "McQuode",
        "gender": "Male",
        "bornCity": "Ciduren",
        "birthdate": "24/12/1957",
        "img": "http://dummyimage.com/600x400.png/dddddd/000000",
        "rating": 2.03,
        "movies": [
          3,
          7
        ]
      }
      component.actors = [mockActorToRemove];
      // TODO get a htmlInputElement 
      component.removeActor(mockActorToRemove);
      expect(component.actors.length).toEqual(0);
    });
    it('removeActor case not found', () => {
      const mockActorToRemove = {
        "id": 2,
        "first_name": "Isaak",
        "last_name": "McQuode",
        "gender": "Male",
        "bornCity": "Ciduren",
        "birthdate": "24/12/1957",
        "img": "http://dummyimage.com/600x400.png/dddddd/000000",
        "rating": 2.03,
        "movies": [
          3,
          7
        ]
      }
      component.actors = [{
        "id": 1,
        "first_name": "Isaak",
        "last_name": "McQuode",
        "gender": "Male",
        "bornCity": "Ciduren",
        "birthdate": "24/12/1957",
        "img": "http://dummyimage.com/600x400.png/dddddd/000000",
        "rating": 2.03,
        "movies": [
          3,
          7
        ]
      }];
      // TODO get a htmlInputElement 
      component.removeActor(mockActorToRemove);
      expect(component.actors.length).toEqual(1);
    });
    it('addActor', () => {
      component.actors = [{
        "id": 1,
        "first_name": "Isaak",
        "last_name": "McQuode",
        "gender": "Male",
        "bornCity": "Ciduren",
        "birthdate": "24/12/1957",
        "img": "http://dummyimage.com/600x400.png/dddddd/000000",
        "rating": 2.03,
        "movies": [
          3,
          7
        ]
        
      }];
      component.addActor({
        "id": 2,
        "first_name": "Isaak",
        "last_name": "McQuode",
        "gender": "Male",
        "bornCity": "Ciduren",
        "birthdate": "24/12/1957",
        "img": "http://dummyimage.com/600x400.png/dddddd/000000",
        "rating": 2.03,
        "movies": [
          3,
          7
        ]
        
      });
      expect(component.actors.length).toEqual(2);
    });
    it('resetForm', () => {
      component.resetForm();
      expect(component.genders.length).toEqual(0);
    });
    it('updateStudioInfo', () => {
      component.movieForm.get('studio').setValue({
        movies: []
      });
      component.updateStudioInfo(1);
      expect(component.genders.length).toEqual(0);
    });
    it('updateStudioInfo', () => {
      const moviesServiceStub = fixture.debugElement.injector.get<StudioService>(
        StudioService as any
      );
      spyOn(moviesServiceStub, 'putStudio').and.returnValue(throwError('error'));
      component.movieForm.get('studio').setValue({
        movies: []
      });
      component.updateStudioInfo(1);
      expect(component.error).toBeTruthy;
    });
    it('loadActorsChips', () => {
      component.actors = [];
      component.actorList = [
        {
          "id": 1,
          "first_name": "Isaak",
          "last_name": "McQuode",
          "gender": "Male",
          "bornCity": "Ciduren",
          "birthdate": "24/12/1957",
          "img": "http://dummyimage.com/600x400.png/dddddd/000000",
          "rating": 2.03,
          "movies": [
            3,
            7
          ]
        }
      ]
      component.movieForm.get('actors').setValue([1]);
      (component as any).loadActorsChips();
      expect(component.actors.length).toEqual(1);
    })
  })
});
