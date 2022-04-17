import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import { GenericPageComponent } from './generic-page/generic-page.component';
import {HttpClientModule} from "@angular/common/http";
import { ContactPageComponent } from './contact-page/contact-page.component';

@NgModule({
  declarations: [
    AppComponent,
    GenericPageComponent,
    ContactPageComponent
  ],
    imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot([
        {path: "", redirectTo: "oth/home", pathMatch: "full"},
        {path: "oth/kontakt", component: ContactPageComponent},
        {path: ":section/:page", component: GenericPageComponent}
      ]),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
