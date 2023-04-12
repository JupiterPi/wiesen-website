import {Injectable} from '@angular/core';
import {BehaviorSubject, filter, Observable} from "rxjs";
import {BlogPage, Page, StorageService} from "./storage.service";
import {Event as NavigationEvent, NavigationEnd, Router} from "@angular/router";
import {isNonNull} from "./util";

@Injectable({
  providedIn: 'root'
})
export class PageStructureService {
  private pageStructure = new BehaviorSubject<Page[][]>([]);
  private blogPages = new BehaviorSubject<BlogPage[]>([]);
  private activatedPage = new BehaviorSubject<string|null>(null);

  constructor(private storage: StorageService, private router: Router) {
    this.storage.getPagesInfo().subscribe(pagesInfo => {
      this.pageStructure.next(pagesInfo.pages);
      this.blogPages.next(pagesInfo.blogPages.map(page => {
        return {
          id: page["id"],
          title: page["title"],
          date: new Date(page["date"])
        };
      }));
    });

    router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {

        const pageId = this.router.url.substring(1);
        this.pageStructure.subscribe(pageStructure => {
          for (let page of pageStructure.flat()) {
            if (pageId.startsWith(page.id)) {
              this.activatedPage.next(page.id);
              break;
            }
          }
        });
        this.blogPages.subscribe(blogPages => {
          for (let blogPage of blogPages) {
            const blogPageId = "blog/" + blogPage.id;
            if (pageId.startsWith(blogPageId)) {
              this.activatedPage.next(blogPageId);
              break;
            }
          }
        });

      }
    });
  }

  getPageStructure(): Observable<Page[][]> {
    return this.pageStructure.pipe(filter(isNonNull));
  }

  getBlockPages(): Observable<BlogPage[]> {
    return this.blogPages.pipe(filter(isNonNull));
  }

  getActivatedPage(): Observable<string> {
    return this.activatedPage.pipe(filter(isNonNull));
  }
}
