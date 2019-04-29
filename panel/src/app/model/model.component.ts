import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

import { Model, Field } from '../types';


@Component({
  selector: 'model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  @ViewChild('box') box: ElementRef;
  @Input() public model: Model;

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
