import {Component, Input} from '@angular/core';
import {mdBlockquote, mdContent, mdParagraph, mdPhrasingContent, mdText} from '../tree-types';

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

  stringify(obj: any) {
    return JSON.stringify(obj);
  }

  /* blockquotes */

  getBlockquoteType(blockquote: mdBlockquote): "blockquote" | "table" | "gallery" {
    const content = this.getBlockquoteTextContent(blockquote);
    if (content?.startsWith("table")) return "table";
    if (content?.startsWith("gallery") || content?.startsWith("expandable_gallery")) return "gallery";
    return "blockquote";
  }

  getBlockquoteTextContent(blockquote: mdBlockquote) {
    if (blockquote.children != undefined) {
      const paragraph = blockquote.children[0] as mdParagraph;
      if (paragraph.children != undefined) {
        const text = paragraph.children[0] as mdText;
        return text.value;
      }
    }
    return null;
  }

  /* (as table) */

  getTableIdFromBlockquote(blockquote: mdBlockquote) {
    const text = this.getBlockquoteTextContent(blockquote);
    return text?.substring("table ".length);
  }

  /* (as gallery) */

  getGalleryGroupIdFromBlockquote(blockquote: mdBlockquote) {
    const text = this.getBlockquoteTextContent(blockquote);
    return text?.split(" ")[1];
  }

  getGalleryTitleFromBlockquote(blockquote: mdBlockquote) {
    const rawText = this.getBlockquoteTextContent(blockquote) ?? "";
    const text = rawText.substring(rawText.indexOf(" ")+1);

    const index = text?.indexOf(" ");
    if (index == -1) {
      return undefined;
    } else {
      return text.substring(index + 1);
    }
  }

  getGalleryExpandableFromBlockquote(blockquote: mdBlockquote) {
    const text = this.getBlockquoteTextContent(blockquote);
    return text?.startsWith("expandable");
  }
}
