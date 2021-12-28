import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerFullOverlayService } from './core/spinner-full-overlay/spinner-full-overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private readonly translate: TranslateService, private spinnerFullOverlay: SpinnerFullOverlayService) {
    translate.setDefaultLang('es');
  }
  public showSpinner = false;
  public fillerNav = [
    { label: "SIDEBAR.FILMS", route: '/movies' },
    { label: "SIDEBAR.ACTORS", route: "/actors" },
    { label: "SIDEBAR.STUDIOS", route: "/studios" }
  ]
  ngOnInit() {
    this.spinnerFullOverlay.isShowing().subscribe( showing => {
      console.log('showing', showing);
      this.showSpinner = showing;
    })
  }
}
