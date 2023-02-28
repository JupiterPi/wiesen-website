import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {PageStructureService} from "./page-structure.service";
import {Page} from "./storage.service";
import {Event as NavigationEvent, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageStructure: Observable<Page[][]>;
  activatedPage: Observable<string>;

  constructor(private pageStructureService: PageStructureService, private router: Router) {
    this.pageStructure = this.pageStructureService.getPageStructure();
    this.activatedPage = this.pageStructureService.getActivatedPage();

    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        this.expandToc = false;
      }
    });
  }

  expandToc = false;
  toggleExpandToc() {
    this.expandToc = !this.expandToc;
  }

  getActivatedPage(): Observable<Page> {
    return new Observable(subscriber => {
      this.activatedPage.subscribe(activatedPageId => {
        this.pageStructure.subscribe(pageStructure => {
          subscriber.next(pageStructure.flat().find(page => page.id == activatedPageId));
        });
      });
    });
  }
}
