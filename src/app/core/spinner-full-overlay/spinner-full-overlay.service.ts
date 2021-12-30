import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerFullOverlayService {

  private readonly spinnerShowing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private spinnerCounter = 0;
  constructor() { }

  public show(): void {
    this.spinnerCounter++;
    this.spinnerShowing.next(true);    
  }
  public hide(): void {
    this.spinnerCounter--;
    if(this.spinnerCounter <= 0) {
      this.spinnerCounter = 0;
      this.spinnerShowing.next(false);
    }
  }

  public isShowing(): Observable<boolean> {
    return this.spinnerShowing.asObservable();
  }
}
