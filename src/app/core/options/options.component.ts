import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'vn-options',
  templateUrl: './options.component.html'
})
export class OptionsComponent {
  showSettings = false;
  options = {
    collapsed: false,
    compact: false,
    boxed: false,
    dark: false,
    dir: 'ltr'
  };

  @Output()
  messageEvent = new EventEmitter<Object>();

  constructor() {
  }

  sendOptions() {
    if (this.options.collapsed === true) {
      this.options.compact = false;
    }
    if (this.options.compact === true) {
      this.options.collapsed = false;
    }
    this.messageEvent.emit(this.options);
  }
}
