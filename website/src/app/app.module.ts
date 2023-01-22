import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {GenericPageComponent} from './generic-page/generic-page.component';
import {HttpClientModule} from "@angular/common/http";
import {ContactPageComponent} from './contact-page/contact-page.component';
import {AngularFireStorageModule, BUCKET} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";

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
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireStorageModule
    ],
  providers: [
    {provide: BUCKET, useValue: "wiesen-website.appspot.com" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
