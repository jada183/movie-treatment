import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public fillerNav = [
    { label: "Peliculas", route: '/movies' },
    { label: "Actores", route: "/actors" },
    { label: "Estudios", route: "/studios" }
  ]
}
