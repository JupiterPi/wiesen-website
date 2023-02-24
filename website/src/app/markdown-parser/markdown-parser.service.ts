import {Inject, Injectable} from '@angular/core';
import {Processor} from "unified";
import {mdRoot} from "./tree-types";

@Injectable({
  providedIn: 'root'
})
export class MarkdownParserService {
  constructor(@Inject('reparse') private reparse: Processor) {}

  parse(markdown: string): mdRoot {
    return this.reparse.parse(markdown) as mdRoot;
  }
}
