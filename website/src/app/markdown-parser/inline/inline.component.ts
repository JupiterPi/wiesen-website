import {Component, Input} from '@angular/core';
import {mdPhrasingContent} from '../tree-types';
import {Router} from "@angular/router";

@Component({
  selector: '[md-inline]',
  templateUrl: './inline.component.html',
  styleUrls: ['./inline.component.scss']
})
export class MarkdownInline {
  @Input("md-inline") node: mdPhrasingContent | undefined;

  constructor(private router: Router) {}

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

}
