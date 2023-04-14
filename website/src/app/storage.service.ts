import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, filter, Observable} from "rxjs";
import {environment} from "../environments/environment";
import {CacheMap, isNonNull} from "./util";

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

export interface PictureGroup {
  id: string;
  pictures: Picture[];
}
interface PictureGroupDTO {
  id: string;
  pictures: PictureDTO[];
}

export interface Picture {
  id: string;
  src: string;
  title: string;
  description?: string[];
}
interface PictureDTO {
  id?: string;
  src: string;
  title: string;
  description?: string[];
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

  getPicturesInfo(): Observable<PictureGroup[]> {
    return new Observable(subscriber => {
      this.storage.ref(this.root + "/pictures/pictures.json").getDownloadURL().subscribe(downloadURL => {
        this.http.get<{pictures: PictureGroupDTO[]}>(downloadURL).subscribe(picturesInfo => {
          subscriber.next(
            picturesInfo.pictures
              .map(groupDTO => {
                return {
                  id: groupDTO.id,
                  pictures: groupDTO.pictures
                    .map(pictureDTO => {
                      return {
                        id: pictureDTO.id ?? pictureDTO.src.substring(1, pictureDTO.src.lastIndexOf(".")),
                        src: pictureDTO.src.startsWith("/") ? "/" + groupDTO.id + pictureDTO.src : pictureDTO.src,
                        title: pictureDTO.title,
                        description: pictureDTO.description
                      };
                    })
                };
              })
          );
        });
      });
    });
  }

  pictureUrls = new CacheMap<string, BehaviorSubject<string | undefined>>(src => {
    const s = new BehaviorSubject<string | undefined>(undefined);
    this.storage.ref(this.root + "/pictures" + src).getDownloadURL()/*.pipe(first())*/.subscribe(url => {
      s.next(url);
    });
    return s;
  });
  getPictureUrl(src: string): Observable<string> {
    return this.pictureUrls.get(src).pipe(filter(isNonNull));
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
