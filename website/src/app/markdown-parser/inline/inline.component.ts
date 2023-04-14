import {Component, Input} from '@angular/core';
import {mdImage, mdPhrasingContent} from '../tree-types';
import {Router} from "@angular/router";
import {StorageService} from "../../storage.service";
import {BehaviorSubject, Observable} from "rxjs";
import {CacheMap} from "../../util";

@Component({
  selector: '[md-inline]',
  templateUrl: './inline.component.html',
  styleUrls: ['./inline.component.scss']
})
export class MarkdownInline {
  @Input("md-inline") node: mdPhrasingContent | undefined;

  constructor(private router: Router, private storage: StorageService) {}

  get children(): mdPhrasingContent[] {
    return (this.node != undefined && "children" in this.node) ? this.node.children ?? [] : [];
  }

  navigate(event: MouseEvent, url: string) {
    event.preventDefault();
    if (url.startsWith("/")) {
      this.router.navigate(url.split("/"));
    } else {
      window.open(url);
    }
  }

  getThumbnailUrl(img: mdImage): Observable<string | undefined> {
    const title = img.title;
    if (title != undefined) {
      return this.imageUrls.get(title);
    } else {
      return new BehaviorSubject(undefined);
    }
  }

  imageUrls = new CacheMap<string, Observable<string>>(src => {
    return src.startsWith("/")
      ? this.storage.getPictureUrl(src)
      : new BehaviorSubject(src);
  });
}
