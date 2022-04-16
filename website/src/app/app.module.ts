import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import { SamplePageComponent } from './sample-page/sample-page.component';
import { MarkdownPageComponent } from './markdown-page/markdown-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SamplePageComponent,
    MarkdownPageComponent
  ],
    imports: [
      BrowserModule,
      RouterModule.forRoot([
        {path: "", component: SamplePageComponent},
        {path: "markdown", component: MarkdownPageComponent}
      ]),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
