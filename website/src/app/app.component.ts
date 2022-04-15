import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toc = [
    [
      {
        name: "Home",
        route: "/"
      }
    ], [
      {
        name: "Der Ort Mährisch Wiesen",
        route: "/"
      },
      {
        name: "Yet Another Page",
        route: "/"
      }
    ], [
      {
        name: "A Very Other Page",
        route: "/"
      },
      {
        name: "The Last Page",
        route: "/"
      }
    ]
  ]
}
