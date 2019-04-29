import { Component, OnInit, Input, ElementRef } from '@angular/core';

import { Field } from '../types';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  @Input() public field: Field;
  public joined: boolean = false;

  constructor(private elref: ElementRef) {
  }

  ngOnInit() {
    this.field.component = this;
  }

  get native() {
    return this.elref.nativeElement;
  }
}
