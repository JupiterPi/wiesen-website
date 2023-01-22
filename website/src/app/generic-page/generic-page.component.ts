import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Event as NavigationEvent, NavigationEnd, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
declare let marked: any;

@Component({
  selector: 'app-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.css']
})
export class GenericPageComponent implements OnInit {
  parsedHtml = "Page loading...";
  @ViewChild("container") container?: ElementRef;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        this.loadPage();
      }
    });
  }

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    const params = this.route.snapshot.params;
    this.http.get("/api/page/" + params["section"] + "/" + params["page"], {responseType: "text"}).subscribe({
      next: markdown => {
        this.parsedHtml = marked.parse(`Displaying generic page **${params["page"]}** in section **${params["section"]}**: \n\n${markdown}`);
        this.writePageContent(this.parsedHtml);

        /*const images = container.getElementsByTagName("img");
        for (let i = 0; i < images.length; i++) {
          let image = images.item(i) as HTMLImageElement;
        }*/
      },
      error: err => {
        this.parsedHtml = `<h1>${err.status}</h1><p>This page could not be loaded: ${err.error}</p>`;
        this.writePageContent(this.parsedHtml);
        console.error(err);
      }
    });
  }

  writePageContent(content: string) {
    const container = this.container?.nativeElement as HTMLDivElement;
    container.innerHTML = content;
  }
}
