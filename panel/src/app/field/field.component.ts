import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';

import { Field, FilterType, OrderType } from '../types';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  @Input() public field: Field;
  @Output() join: EventEmitter<void> = new EventEmitter<void>();
  @Output() select: EventEmitter<void> = new EventEmitter<void>();

  public joined: boolean = false;

  constructor(private elref: ElementRef) {
  }

  ngOnInit() {
    this.field.component = this;
  }

  get native() {
    return this.elref.nativeElement;
  }

  get filterTypeOp(): string {
    if (this.field.filter) {
      if (this.field.filter.type == 'equals') return '==';
      if (this.field.filter.type == 'neq') return '!=';
      if (this.field.filter.type == 'after') return '>';
      if (this.field.filter.type == 'aftereq') return '>=';
      if (this.field.filter.type == 'before') return '<';
      if (this.field.filter.type == 'beforeeq') return '<=';
    }
  }
}
