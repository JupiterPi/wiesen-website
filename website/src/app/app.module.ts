import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import { SamplePageComponent } from './sample-page/sample-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SamplePageComponent
  ],
    imports: [
      BrowserModule,
      RouterModule.forRoot([
        {path: "", component: SamplePageComponent}
      ]),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
