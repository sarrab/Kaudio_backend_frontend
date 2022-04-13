import { Subject } from 'rxjs/Subject';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent {
  @Input() term = new Subject<string>();

  constructor() { }

  search(term: string): void {
    this.term.next(term);
  }
}
