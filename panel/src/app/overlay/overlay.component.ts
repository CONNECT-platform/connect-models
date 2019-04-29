import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  @Output() closed: EventEmitter<void> = new EventEmitter<void>();
  @Input() public active: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  activate() {
    this.active = true;
  }

  close() {
    this.active = false;
    this.closed.emit();
  }
}
