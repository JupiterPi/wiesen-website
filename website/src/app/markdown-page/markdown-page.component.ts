import {Component, OnInit} from '@angular/core';
import {StorageService} from "../storage.service";
import {PageStructureService} from "../page-structure.service";
import {MarkdownParserService} from "../markdown-parser/markdown-parser.service";
import {mdRoot} from "../markdown-parser/tree-types";

@Component({
  selector: 'app-markdown-page',
  template: "<div [md-block]=\"rootNode\"></div>",
  styleUrls: ['./markdown-page.component.css']
})
export class MarkdownPageComponent implements OnInit {
  rootNode?: mdRoot;

  constructor(private pageStructureService: PageStructureService, private storage: StorageService, private markdownParser: MarkdownParserService) {}

  ngOnInit() {
    this.pageStructureService.activatedPage.subscribe(activatedPage => {
      this.storage.getPageContent(activatedPage).subscribe(pageContent => {
        this.rootNode = this.markdownParser.parse(pageContent);
      });
    });
  }
}
