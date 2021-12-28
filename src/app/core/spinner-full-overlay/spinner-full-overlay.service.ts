import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerFullOverlayService {

  private readonly spinnerShowing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public show(): void {
    this.spinnerShowing.next(true);
  }
  public hide(): void {
    this.spinnerShowing.next(false);
  }
}
