import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input("src") imageUrl?: string;
  @Input("src-thumbnail") thumbnailUrl?: string;
  @Input("alt") alternativeText?: string;

  get effectiveImageUrl(): string | undefined {
    return this.thumbnailUrl ?? this.imageUrl;
  }

  openImage() {
    if (this.imageUrl != null) window.open(this.imageUrl);
  }
}
