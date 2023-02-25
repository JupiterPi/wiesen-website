import {Component, Input} from '@angular/core';
import {mdContent, mdPhrasingContent} from '../tree-types';

@Component({
  selector: '[md-block]',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class MarkdownBlock {
  @Input("md-block") node?: mdContent;

  get children(): mdContent[] {
    return (this.node != undefined && "children" in this.node) ? this.node.children ?? [] : [];
  }

  asMdPhrasingContent(mdContent: mdContent): mdPhrasingContent {
    return mdContent as mdPhrasingContent;
  }
}
