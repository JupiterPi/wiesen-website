import {Component, Input, OnInit} from '@angular/core';
import {Picture, PictureGroup, StorageService} from "../../storage.service";
import {first, Observable} from "rxjs";
import {PageStructureService} from "../../page-structure.service";
import {Router} from "@angular/router";

export type OnclickAction = "openPage" | "openImage";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input("src") imageSource?: string;
  @Input("picture") picture?: Picture;
  group?: PictureGroup;

  @Input("show-title") showTitle = true;
  @Input("onclick-action") onclickAction: OnclickAction = "openPage";

  constructor(private pageStructureService: PageStructureService, private storage: StorageService, private router: Router) {}

  ngOnInit() {
    if (this.picture) return;
    if (!this.imageSource) return;

    const idParts = this.imageSource.substring(1).split("/");
    const groupId = idParts[0];
    const pictureId = idParts[1];

    this.pageStructureService.getPictures().subscribe(pictures => {
      this.group = pictures
        .find(group => group.id == groupId);
      this.picture = this.group?.pictures
        .find(picture => picture.id == pictureId);
    });
  }

  effectiveImageUrl(): Observable<string | undefined> {
    return new Observable<string>(subscriber => {
      if (this.picture) {
        const src = this.picture.src;
        if (src.startsWith("/")) {
          this.storage.getPictureUrl(src).subscribe(url => {
            subscriber.next(url);
          });
        } else {
          subscriber.next(src);
        }
      } else {
        subscriber.next(undefined);
      }
    });
  }

  openImage() {
    if (this.onclickAction == "openPage") {
      if (!this.picture) return;
      this.router.navigate(["img", this.group?.id, this.picture.id]);
    } else {
      this.effectiveImageUrl().subscribe(url => {
        if (url) window.open(url);
      });
    }
  }

  protected readonly first = first;
}
