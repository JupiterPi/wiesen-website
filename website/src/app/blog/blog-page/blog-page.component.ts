import {Component} from '@angular/core';
import {PageStructureService} from "../../page-structure.service";
import {BlogPage} from "../../storage.service";

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent {
  blogPages: BlogPage[] = [];

  constructor(private pageStructureService: PageStructureService) {
    this.pageStructureService.getBlockPages().subscribe(blogPages => {
      this.blogPages = blogPages;
    });
  }
}
