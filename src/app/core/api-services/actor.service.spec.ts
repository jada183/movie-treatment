import { TestBed } from '@angular/core/testing';

import { ActorService } from './actor.service';

xdescribe('ActorService', () => {
  let service: ActorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
