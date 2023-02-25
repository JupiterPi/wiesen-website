import {Component, OnInit} from '@angular/core';
import {StorageService} from "../storage.service";
import {PageStructureService} from "../page-structure.service";
import {MarkdownParserService} from "../markdown-parser/markdown-parser.service";
import {mdRoot} from "../markdown-parser/tree-types";

@Component({
  selector: 'app-markdown-page',
  templateUrl: 'markdown-page.component.html'
})
export class MarkdownPageComponent implements OnInit {
  rootNode?: mdRoot;

  constructor(private pageStructureService: PageStructureService, private storage: StorageService, private markdownParser: MarkdownParserService) {}

  ngOnInit() {
    this.pageStructureService.getActivatedPage().subscribe(activatedPage => {
      this.storage.getPageContent(activatedPage).subscribe(pageContent => {
        this.rootNode = this.markdownParser.parse(pageContent);
      });
    });
  }
}
