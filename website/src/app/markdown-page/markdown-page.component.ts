import {Component, OnInit} from '@angular/core';
import {StorageService} from "../storage.service";
import {PageStructureService} from "../page-structure.service";
import {MarkdownParserService} from "../markdown-parser/markdown-parser.service";
import {mdRoot} from "../markdown-parser/tree-types";

@Component({
  selector: 'app-markdown-page',
  templateUrl: './markdown-page.component.html',
  styleUrls: ['./markdown-page.component.scss']
})
export class MarkdownPageComponent implements OnInit {
  rootNode?: mdRoot;

  isBlogPage = false;
  blogReleaseDate?: Date;

  constructor(private pageStructureService: PageStructureService, private storage: StorageService, private markdownParser: MarkdownParserService) {}

  ngOnInit() {
    this.pageStructureService.getActivatedPage().subscribe(activatedPage => {

      if (activatedPage.startsWith("blog")) {
        this.isBlogPage = true;
        this.pageStructureService.getBlockPages().subscribe(blogPages => {
          const blockPage = blogPages.find(page => "blog/" + page.id == activatedPage);
          this.blogReleaseDate = blockPage?.date;
        });
      } else {
        this.isBlogPage = false;
        this.blogReleaseDate = undefined;
      }

      this.pageStructureService.getPageStructure().subscribe(pageStructure => {
        const page = pageStructure.flat().find(page => page.id == activatedPage);
        const isCustomPage = page?.type == "custom";
        if (!isCustomPage) {
          this.storage.getPageContent(activatedPage).subscribe(pageContent => {
            this.rootNode = this.markdownParser.parse(pageContent);
          });
        }
      });

    });
  }
}
