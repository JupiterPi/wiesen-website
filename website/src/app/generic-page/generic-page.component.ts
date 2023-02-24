import {Component, OnInit} from '@angular/core';
import {StorageService} from "../storage.service";
import {PageStructureService} from "../page-structure.service";
import {MarkdownParserService} from "../markdown-parser/markdown-parser.service";
import {mdRoot} from "../markdown-parser/tree-types";

@Component({
  selector: 'app-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.css']
})
export class GenericPageComponent implements OnInit {
  rootNode?: mdRoot;

  constructor(private pageStructureService: PageStructureService, private storage: StorageService, private markdownParser: MarkdownParserService) {}

  ngOnInit() {
    this.pageStructureService.activatedPage.subscribe(activatedPage => {
      this.storage.getPageContent(activatedPage).subscribe(pageContent => {
        const markdown = `Displaying generic page **${activatedPage}**: \n\n${pageContent}`;
        this.rootNode = this.markdownParser.parse(markdown);
        console.log(this.markdownParser.parse(markdown));
      });
    });
  }

  stringify() {
    return JSON.stringify(this.rootNode);
  }
}
