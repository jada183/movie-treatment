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
    { label: "Peliculas", route: '/movies' },
    { label: "Actores", route: "/actors" },
    { label: "Estudios", route: "/studios" }
  ]
}
