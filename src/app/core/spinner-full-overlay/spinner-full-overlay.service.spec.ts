import { TestBed } from '@angular/core/testing';

import { SpinnerFullOverlayService } from './spinner-full-overlay.service';

xdescribe('SpinnerFllOverlayService', () => {
  let service: SpinnerFullOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerFullOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
