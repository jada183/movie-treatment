import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly translate: TranslateService) {
    translate.setDefaultLang('es');
  }
  public fillerNav = [
    { label: "SIDEBAR.FILMS", route: '/movies' },
    { label: "SIDEBAR.ACTORS", route: "/actors" },
    { label: "SIDEBAR.STUDIOS", route: "/studios" }
  ]
}
