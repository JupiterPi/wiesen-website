import { Component, OnInit } from '@angular/core';
declare let marked: any;

@Component({
  selector: 'app-markdown-page',
  templateUrl: './markdown-page.component.html',
  styleUrls: ['./markdown-page.component.css']
})
export class MarkdownPageComponent implements OnInit {
  markdown = "# Markdown Page\n\nThis is a page made *purely* from markdown!";
  parsedHtml = "Page loading...";

  constructor() { }

  ngOnInit(): void {
    this.parsedHtml = marked.parse(this.markdown);
  }

}
