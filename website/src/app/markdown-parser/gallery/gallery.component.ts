import {Component, Input, OnInit} from '@angular/core';
import {PageStructureService} from "../../page-structure.service";
import {Picture} from "../../storage.service";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input("id") groupId?: string;
  @Input("title") title?: string;
  pictures: Picture[] = [];

  constructor(private pageStructure: PageStructureService) {}

  ngOnInit(): void {
    this.pageStructure.getPictures().subscribe(pictures => {
      const group = pictures.find(group => group.id == this.groupId);
      if (group) this.pictures = group.pictures;
    });
  }
}
