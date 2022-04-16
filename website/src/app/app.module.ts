import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import { SamplePageComponent } from './sample-page/sample-page.component';
import { GenericPageComponent } from './generic-page/generic-page.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    SamplePageComponent,
    GenericPageComponent
  ],
    imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot([
        {path: "", component: SamplePageComponent},
        {path: ":section/:page", component: GenericPageComponent}
      ]),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
