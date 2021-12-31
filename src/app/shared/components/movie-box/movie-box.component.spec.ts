import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieBoxComponent } from './movie-box.component';

describe('MovieBoxComponent', () => {
  let component: MovieBoxComponent;
  let fixture: ComponentFixture<MovieBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
