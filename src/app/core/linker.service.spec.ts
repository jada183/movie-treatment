import { TestBed } from '@angular/core/testing';

import { LinkerService } from './linker.service';

xdescribe('LinkerService', () => {
  let service: LinkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
