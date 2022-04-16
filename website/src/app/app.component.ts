import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Event as NavigationEvent, NavigationEnd} from "@angular/router";

export type Page = {
  id: string;
  section: string;
  route: string;
  routeId: string;
  name: string;
  activated: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pages_data = {
    sections: [
      {
        name: "oth",
        pages: [
          {
            id: "home",
            name: "Home"
          },
          {
            id: "genealogie",
            name: "Genealogie"
          },
          {
            id: "kontakt",
            name: "Kontakt"
          }
        ]
      },
      {
        name: "mw",
        pages: [
          {
            id: "ort-maehrisch-wiesen",
            name: "Der Ort Mährisch Wiesen"
          },
          {
            id: "geschichte-von-maehrisch-wiesen",
            name: "Geschichte von Mährisch Wiesen"
          },
          {
            id: "volkszaehlungen",
            name: "Volkszählungen"
          }
        ]
      },
      {
        name: "bw",
        pages: [
          {
            id: "ort-boehmisch-wiesen",
            name: "Der Ort Böhmisch Wiesen"
          },
          {
            id: "geschichte-von-boehmisch-wiesen",
            name: "Geschichte von Böhmisch Wiesen"
          },
          {
            id: "volkszaehlungen",
            name: "Volkszählungen"
          }
        ]
      }
    ]
  }

  pages: Page[] = []

  toc_data = [
    ["oth/home"],
    ["mw/ort-maehrisch-wiesen", "mw/geschichte-von-maehrisch-wiesen", "mw/volkszaehlungen"],
    ["bw/ort-boehmisch-wiesen", "bw/geschichte-von-boehmisch-wiesen", "bw/volkszaehlungen"],
    ["oth/genealogie", "oth/kontakt"]
  ]

  toc: Page[][] = []

  constructor(private router: Router, private route: ActivatedRoute) {
    router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        this.showActivatedPageInToc();
      }
    });
  }

  ngOnInit() {
    for (let section of this.pages_data.sections) {
      for (let page of section.pages) {
        this.pages.push({
          id: page.id,
          section: section.name,
          route: "/" + section.name + "/" + page.id,
          routeId: section.name + "/" + page.id,
          name: page.name,
          activated: true
        });
      }
    }

    for (let section_data of this.toc_data) {
      let section: Page[] = [];
      for (let pageId of section_data) {
        const page = this.pages.find(page => page.routeId === pageId) as Page;
        section.push(page);
      }
      this.toc.push(section);
    }

    this.showActivatedPageInToc();
  }

  showActivatedPageInToc() {
    const params = (this.route.firstChild as ActivatedRoute).snapshot.params;
    const targetRouteId = params["section"] + "/" + params["page"];
    for (let section of this.toc) {
      for (let page of section) {
        page.activated = page.routeId === targetRouteId;
      }
    }
  }
}
