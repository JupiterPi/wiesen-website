import {Component} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PageStructureService} from "./page-structure.service";
import {Page} from "./storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageStructure: BehaviorSubject<Page[][]>;
  activatedPage: BehaviorSubject<string>;

  constructor(private pageStructureService: PageStructureService) {
    this.pageStructure = this.pageStructureService.pageStructure;
    this.activatedPage = this.pageStructureService.activatedPage;
  }
}
