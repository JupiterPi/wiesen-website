import {Component, Input, ViewEncapsulation} from '@angular/core';
import {mdPhrasingContent} from '../tree-types';

@Component({
  selector: '[md-inline]',
  templateUrl: './inline.component.html',
  styleUrls: ['./inline.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MarkdownInline {

  @Input('md-inline') node: mdPhrasingContent | undefined;

  /*constructor(readonly tree: MarkdownTree, private root: MarkdownRoot) {}*/

  get children(): mdPhrasingContent[] {
    return (this.node != undefined && "children" in this.node) ? this.node.children ?? [] : [];
  }

  // Text rendering helper
  public _T(value: string) { return value || ''; }

  // Navigation helper functions
  /*public navigate(url: string): boolean {
    // Relies on the root parent navigation mechanism
    this.root.navigate.emit(url);
    // Prevents default navigation towards href
    return false;
  }*/
}
