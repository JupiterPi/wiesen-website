import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input("src") imageUrl?: string;
  @Input("alt") alternativeText?: string;

  openImage() {
    if (this.imageUrl != null) window.open(this.imageUrl);
  }
}
