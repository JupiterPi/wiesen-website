import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {MarkdownPageComponent} from './markdown-page/markdown-page.component';
import {HttpClientModule} from "@angular/common/http";
import {AngularFireStorageModule, BUCKET} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";

import { reparseFactory } from './markdown-parser/reparse-factory';
import {MarkdownBlock} from "./markdown-parser/block/block.component";
import {MarkdownInline} from "./markdown-parser/inline/inline.component";
import { ImageComponent } from './markdown-parser/image/image.component';

@NgModule({
  declarations: [
    AppComponent,
    MarkdownPageComponent,
    MarkdownBlock,
    MarkdownInline,
    ImageComponent,
  ],
    imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot([
        {path: "", redirectTo: "oth/home", pathMatch: "full"},
        {path: ":section/:page", component: MarkdownPageComponent}
      ]),
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireStorageModule
    ],
  providers: [
    {provide: BUCKET, useValue: "wiesen-website.appspot.com" },
    {provide: "reparse", useFactory: reparseFactory}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
