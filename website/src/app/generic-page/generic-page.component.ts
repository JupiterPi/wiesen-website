import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Event as NavigationEvent, NavigationEnd, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "../storage.service";
import {PageStructureService} from "../page-structure.service";
declare let marked: any;

@Component({
  selector: 'app-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.css']
})
export class GenericPageComponent implements OnInit {
  parsedHtml = "Page loading...";
  @ViewChild("container") container?: ElementRef;

  constructor(private pageStructureService: PageStructureService, private storage: StorageService) {}

  ngOnInit() {
    this.pageStructureService.activatedPage.subscribe(activatedPage => {
      this.storage.getPageContent(activatedPage).subscribe(pageContent => {
        const parsedHtml = marked.parse(`Displaying generic page **${activatedPage}**: \n\n${pageContent}`);
        const container = this.container?.nativeElement as HTMLDivElement;
        container.innerHTML = parsedHtml;
      });
    });
  }
}
