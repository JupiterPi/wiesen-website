import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Event as NavigationEvent, NavigationEnd, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
declare let marked: any;

@Component({
  selector: 'app-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.css']
})
export class GenericPageComponent implements OnInit {
  parsedHtml = "Page loading...";

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        this.loadPage();
      }
    });
  }

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    const params = this.route.snapshot.params;
    this.http.get("/api/page/" + params["section"] + "/" + params["page"], {responseType: "text"}).subscribe({
      next: markdown => {
        this.parsedHtml = marked.parse(`Displaying generic page **${params["page"]}** in section **${params["section"]}**: \n\n${markdown}`);
      },
      error: err => {
        this.parsedHtml = `<h1>${err.status}</h1><p>This page could not be loaded: ${err.error}</p>`;
        console.error(err);
      }
    });
  }
}
