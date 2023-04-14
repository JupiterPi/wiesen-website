import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {HttpClient} from "@angular/common/http";
import {first, Observable} from "rxjs";
import {environment} from "../environments/environment";

export interface Page {
  id: string;
  title: string;
  type: PageType;
}

export type PageType = "markdown" | "custom";

export interface BlogPage {
  id: string;
  title: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  root = environment.firebaseStorageRoot;

  constructor(private storage: AngularFireStorage, private http: HttpClient) {}

  getPagesInfo(): Observable<{pages: Page[][], blogPages: BlogPage[]}> {
    return new Observable(subscriber => {
      this.storage.ref(this.root + "/pages/pages.json").getDownloadURL().subscribe(downloadUrl => {
        this.http.get<{pages: Page[][], blogPages: BlogPage[]}>(downloadUrl).subscribe(subscriber);
      });
    });
  }

  getPageContent(pageId: string): Observable<string> {
    return new Observable(subscriber => {
      this.storage.ref(this.root + "/pages/" + pageId + ".md").getDownloadURL().subscribe(downloadUrl => {
        this.http.get(downloadUrl, {responseType: "text"}).subscribe(subscriber);
      });
    });
  }

  getImageURL(image: string): Observable<string> {
    if (!image.startsWith("/")) image = "/" + image;
    return this.storage.ref(this.root + "/pic" + image).getDownloadURL().pipe(first());
  }

  getTable(tableId: string): Observable<string> {
    return new Observable(subscriber => {
      this.getTableDownloadUrl(tableId).subscribe(downloadUrl => {
        this.http.get(downloadUrl, {responseType: "text"}).subscribe(subscriber);
      });
    });
  }

  getTableDownloadUrl(tableId: string) {
    return this.storage.ref(this.root + "/tables/" + tableId + ".csv").getDownloadURL();
  }
}
