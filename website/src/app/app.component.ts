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

  constructor(private pageStructureService: PageStructureService, private router: Router) {
    this.pageStructure = this.pageStructureService.getPageStructure();

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

  getActivatedPageTitle(): Observable<string> {
    return new Observable(subscriber => {
      this.pageStructureService.getActivatedPage().subscribe(activatedPageId => {
        this.pageStructure.subscribe(pageStructure => {
          const page = pageStructure.flat().find(page => page.id == activatedPageId);
          subscriber.next(page?.title ?? "Blog");
        });
      });
    });
  }

  isPageActivated(pageId: string): Observable<boolean> {
    return new Observable(subscriber => {
      this.pageStructureService.getActivatedPage().subscribe(activatedPageId => {
        const isBlogPage = activatedPageId.startsWith("blog") && pageId == "oth/blog";
        subscriber.next(activatedPageId == pageId || isBlogPage);
      });
    });
  }
}
