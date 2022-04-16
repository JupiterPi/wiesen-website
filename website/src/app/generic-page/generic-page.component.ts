import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Event as NavigationEvent, NavigationEnd, Router} from "@angular/router";
declare let marked: any;

@Component({
  selector: 'app-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.css']
})
export class GenericPageComponent implements OnInit {
  markdown = "# Markdown Page\n\nThis is a page made *purely* from markdown!";
  parsedHtml = "Page loading...";

  constructor(private router: Router, private route: ActivatedRoute) {
    router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        this.loadPage();
      }
    });
  }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    const params = this.route.snapshot.params;
    this.parsedHtml = marked.parse(`Displaying generic page **${params["page"]}** in section **${params["section"]}**: \n\n${this.markdown}`);
  }
}
