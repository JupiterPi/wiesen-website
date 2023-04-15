import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {MarkdownPageComponent} from './markdown-page/markdown-page.component';
import {HttpClientModule} from "@angular/common/http";
import {AngularFireStorageModule, BUCKET} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";

import {reparseFactory} from './markdown-parser/reparse-factory';
import {MarkdownBlock} from "./markdown-parser/block/block.component";
import {MarkdownInline} from "./markdown-parser/inline/inline.component";
import {ImageComponent} from './markdown-parser/image/image.component';
import {TablePageComponent} from './table-page/table-page.component';
import {FileSaverModule} from "ngx-filesaver";
import {BlogPageComponent} from './blog/blog-page/blog-page.component';
import {GalleryComponent} from './markdown-parser/gallery/gallery.component';
import {ImagePageComponent} from './image-page/image-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MarkdownPageComponent,
    MarkdownBlock,
    MarkdownInline,
    ImageComponent,
    TablePageComponent,
    BlogPageComponent,
    GalleryComponent,
    ImagePageComponent,
  ],
    imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot([
        {path: "", redirectTo: "oth/home", pathMatch: "full"},
        {path: "img/:group/:id", component: ImagePageComponent},
        {path: "oth/blog", component: BlogPageComponent},
        {path: ":section/:page", component: MarkdownPageComponent}
      ]),
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireStorageModule,
      FileSaverModule
    ],
  providers: [
    {provide: BUCKET, useValue: "wiesen-website.appspot.com" },
    {provide: "reparse", useFactory: reparseFactory}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
