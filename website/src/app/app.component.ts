import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Event as NavigationEvent, NavigationEnd} from "@angular/router";
import {HttpClient} from "@angular/common/http";

export type Page = {
  id: string;
  section: string;
  route: string;
  routeId: string;
  name: string;
  activated: boolean;
}

type PageData = {
  pages: Page[],
  toc: Page[][]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pages: Page[] = []
  toc: Page[][] = []

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        this.showActivatedPageInToc();
      }
    });
  }

  ngOnInit() {
    this.http.get<PageData>("/api/pages").subscribe((data: PageData) => {
      this.pages = data.pages;
      this.toc = data.toc;
      this.showActivatedPageInToc();
    }, () => {
      const data = {
        "pages": [
          {
            "id": "home",
            "section": "oth",
            "route": "/oth/home",
            "routeId": "oth/home",
            "name": "Home",
            "activated": false
          },
          {
            "id": "genealogie",
            "section": "oth",
            "route": "/oth/genealogie",
            "routeId": "oth/genealogie",
            "name": "Genealogie",
            "activated": false
          },
          {
            "id": "kontakt",
            "section": "oth",
            "route": "/oth/kontakt",
            "routeId": "oth/kontakt",
            "name": "Kontakt",
            "activated": false
          },
          {
            "id": "ort-maehrisch-wiesen",
            "section": "mw",
            "route": "/mw/ort-maehrisch-wiesen",
            "routeId": "mw/ort-maehrisch-wiesen",
            "name": "Der Ort Mährisch Wiesen",
            "activated": false
          },
          {
            "id": "geschichte-von-maehrisch-wiesen",
            "section": "mw",
            "route": "/mw/geschichte-von-maehrisch-wiesen",
            "routeId": "mw/geschichte-von-maehrisch-wiesen",
            "name": "Geschichte von Mährisch Wiesen",
            "activated": false
          },
          {
            "id": "volkszaehlungen",
            "section": "mw",
            "route": "/mw/volkszaehlungen",
            "routeId": "mw/volkszaehlungen",
            "name": "Volkszählungen",
            "activated": false
          },
          {
            "id": "ort-boehmisch-wiesen",
            "section": "bw",
            "route": "/bw/ort-boehmisch-wiesen",
            "routeId": "bw/ort-boehmisch-wiesen",
            "name": "Der Ort Böhmisch Wiesen",
            "activated": false
          },
          {
            "id": "geschichte-von-boehmisch-wiesen",
            "section": "bw",
            "route": "/bw/geschichte-von-boehmisch-wiesen",
            "routeId": "bw/geschichte-von-boehmisch-wiesen",
            "name": "Geschichte von Böhmisch Wiesen",
            "activated": false
          },
          {
            "id": "volkszaehlungen",
            "section": "bw",
            "route": "/bw/volkszaehlungen",
            "routeId": "bw/volkszaehlungen",
            "name": "Volkszählungen",
            "activated": false
          }
        ],
        "toc": [
          [
            {
              "id": "home",
              "section": "oth",
              "route": "/oth/home",
              "routeId": "oth/home",
              "name": "Home",
              "activated": false
            }
          ],
          [
            {
              "id": "ort-maehrisch-wiesen",
              "section": "mw",
              "route": "/mw/ort-maehrisch-wiesen",
              "routeId": "mw/ort-maehrisch-wiesen",
              "name": "Der Ort Mährisch Wiesen",
              "activated": false
            },
            {
              "id": "geschichte-von-maehrisch-wiesen",
              "section": "mw",
              "route": "/mw/geschichte-von-maehrisch-wiesen",
              "routeId": "mw/geschichte-von-maehrisch-wiesen",
              "name": "Geschichte von Mährisch Wiesen",
              "activated": false
            },
            {
              "id": "volkszaehlungen",
              "section": "mw",
              "route": "/mw/volkszaehlungen",
              "routeId": "mw/volkszaehlungen",
              "name": "Volkszählungen",
              "activated": false
            }
          ],
          [
            {
              "id": "ort-boehmisch-wiesen",
              "section": "bw",
              "route": "/bw/ort-boehmisch-wiesen",
              "routeId": "bw/ort-boehmisch-wiesen",
              "name": "Der Ort Böhmisch Wiesen",
              "activated": false
            },
            {
              "id": "geschichte-von-boehmisch-wiesen",
              "section": "bw",
              "route": "/bw/geschichte-von-boehmisch-wiesen",
              "routeId": "bw/geschichte-von-boehmisch-wiesen",
              "name": "Geschichte von Böhmisch Wiesen",
              "activated": false
            },
            {
              "id": "volkszaehlungen",
              "section": "bw",
              "route": "/bw/volkszaehlungen",
              "routeId": "bw/volkszaehlungen",
              "name": "Volkszählungen",
              "activated": false
            }
          ],
          [
            {
              "id": "genealogie",
              "section": "oth",
              "route": "/oth/genealogie",
              "routeId": "oth/genealogie",
              "name": "Genealogie",
              "activated": false
            },
            {
              "id": "kontakt",
              "section": "oth",
              "route": "/oth/kontakt",
              "routeId": "oth/kontakt",
              "name": "Kontakt",
              "activated": false
            }
          ]
        ]
      };
      this.pages = data.pages;
      this.toc = data.toc;
      this.showActivatedPageInToc();
    });
  }

  showActivatedPageInToc() {
    console.log(this.route.firstChild != null);
    const activatedRoute = (this.route.firstChild != null ? (this.route.firstChild as ActivatedRoute) : this.route);
    console.log(activatedRoute);
    const params = activatedRoute.snapshot.params;
    console.log(params);
    const targetRouteId = params["section"] + "/" + params["page"];
    for (let section of this.toc) {
      for (let page of section) {
        page.activated = page.routeId === targetRouteId;
      }
    }
  }
}
