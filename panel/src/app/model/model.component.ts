import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';

import { Model, Field } from '../types';


@Component({
  selector: 'model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  @ViewChild('box') box: ElementRef;
  @Input() select: boolean = false;
  @Input() public model: Model;
  @Output() public join: EventEmitter<Field> = new EventEmitter<Field>();
  @Output() public pick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {
    this.model.component = this;
  }

  get fields(): Field[] {
    return Object.values(this.model.fields);
  }

  get native() {
    return this.box.nativeElement;
  }
}
