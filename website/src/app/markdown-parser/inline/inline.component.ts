import {Component, Input} from '@angular/core';
import {mdPhrasingContent} from '../tree-types';
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
      window.location.href = url;
    }
  }

  imageUrls = new CacheMap<string, Observable<string>>(src => {
    return src.startsWith("/")
      ? this.storage.getImageURL(src)
      : new BehaviorSubject(src);
  });
}
