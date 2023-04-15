import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Picture} from "../storage.service";
import {PageStructureService} from "../page-structure.service";
import {MarkdownParserService} from "../markdown-parser/markdown-parser.service";
import {mdRoot} from '../markdown-parser/tree-types';

@Component({
  selector: 'app-image-page',
  templateUrl: './image-page.component.html',
  styleUrls: ['./image-page.component.scss']
})
export class ImagePageComponent {
  imageSrc?: string;
  picture?: Picture;
  descriptionNode?: mdRoot;

  constructor(private route: ActivatedRoute, private pageStructureService: PageStructureService, private markdownParser: MarkdownParserService) {
    this.route.params.subscribe(params => {
      const groupId = params["group"];
      const pictureId = params["id"];
      this.imageSrc = "/" + groupId + "/" + pictureId;

      this.pageStructureService.getPictures().subscribe(pictures => {
        this.picture = pictures
          .find(group => group.id == groupId)?.pictures
          .find(picture => picture.id == pictureId);

        if (this.picture?.description) {
          this.descriptionNode = this.markdownParser.parse(this.picture.description.join("\n"));
        }
      });
    });
  }
}
