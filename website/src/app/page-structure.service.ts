import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Page, StorageService} from "./storage.service";
import {Event as NavigationEvent, NavigationEnd, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PageStructureService {
  pageStructure = new BehaviorSubject<Page[][]>([]);
  activatedPage = new BehaviorSubject<string>("");

  constructor(private storage: StorageService, private router: Router) {
    this.storage.getPageStructure().subscribe(pageStructure => {
      console.log(pageStructure);
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
}
