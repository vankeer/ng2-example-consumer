import {Component} from '@angular/core';
import {JSONP_PROVIDERS} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {WikiService} from 'ng2-example-library';

@Component({
  moduleId: module.id,
  selector: 'sd-wiki',
  templateUrl: 'wiki.component.html',
  styleUrls: ['wiki.component.css'],
  providers: [JSONP_PROVIDERS, WikiService]
})
export class WikiComponent {
  term: string;
  results: string[];

  constructor(private wiki: WikiService) {
    this.results = [];
  }

  searchWiki() {
    this.doSearch()
      .subscribe((results) => {
        if (results && results.length > 1) {
          this.results = results[1];
        } else {
          this.results = [];
        }
      });
  }

  private doSearch(): Observable<any[]> { // this return type causes TypeScript error TS2322; removing it fixes it
    return this.wiki.search(this.term);
  }
}
