import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {PageStructureService} from "./page-structure.service";
import {Page} from "./storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageStructure: Observable<Page[][]>;
  activatedPage: Observable<string>;

  constructor(private pageStructureService: PageStructureService) {
    this.pageStructure = this.pageStructureService.getPageStructure();
    this.activatedPage = this.pageStructureService.getActivatedPage();
  }
}
