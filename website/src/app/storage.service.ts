import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {HttpClient} from "@angular/common/http";
import {first, Observable} from "rxjs";

export interface Page {
  id: string;
  title: string;
  type: PageType; //TODO is this needed?
}

export type PageType = "markdown" | "custom";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: AngularFireStorage, private http: HttpClient) {}

  getPageStructure(): Observable<Page[][]> {
    return new Observable<Page[][]>(subscriber => {
      this.storage.ref("contents/pages/pages.json").getDownloadURL().subscribe(downloadUrl => {
        this.http.get<{pages: Page[][]}>(downloadUrl).subscribe(pageStructure => {
          subscriber.next(pageStructure.pages);
        });
      });
    });
  }

  getPageContent(pageId: string): Observable<string> {
    return new Observable<string>(subscriber => {
      this.storage.ref("contents/pages/" + pageId + ".md").getDownloadURL().subscribe(downloadUrl => {
        this.http.get(downloadUrl, {responseType: "text"}).subscribe(subscriber);
      });
    });
  }

  getImageURL(image: string): Observable<string> {
    if (!image.startsWith("/")) image = "/" + image;
    return this.storage.ref("contents/pic" + image).getDownloadURL().pipe(first());
  }
}
