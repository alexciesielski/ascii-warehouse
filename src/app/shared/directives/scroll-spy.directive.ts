import { Directive, EventEmitter } from '@angular/core';

@Directive({
  selector: '[myScrollspy]',
  host: {
    '(window:scroll)': 'onScroll()'
  },
  events: ['scrolled']

})
export class ScrollSpy {
  scrolled = new EventEmitter<number>();

  constructor() { }

  onScroll() {
    let doc = document.documentElement;
    let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    let max = doc.scrollHeight - doc.clientHeight;
    let percentage = Math.round(top / max * 100);

    this.scrolled.emit(percentage);
  }
}
