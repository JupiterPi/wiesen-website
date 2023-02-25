import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, Observable} from "rxjs";
import {Page, StorageService} from "./storage.service";
import {Event as NavigationEvent, NavigationEnd, Router} from "@angular/router";
import {isNonNull} from "./util";

@Injectable({
  providedIn: 'root'
})
export class PageStructureService {
  private pageStructure = new BehaviorSubject<Page[][]>([]);
  private activatedPage = new BehaviorSubject<string|null>(null);

  constructor(private storage: StorageService, private router: Router) {
    this.storage.getPageStructure().subscribe(pageStructure => {
      this.pageStructure.next(pageStructure);
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

      }
    });
  }

  getPageStructure(): Observable<Page[][]> {
    return this.pageStructure.pipe(filter(isNonNull));
  }

  getActivatedPage(): Observable<string> {
    return this.activatedPage.pipe(filter(isNonNull));
  }
}
