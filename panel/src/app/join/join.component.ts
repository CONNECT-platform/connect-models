import { Component, OnInit, Input, HostListener } from '@angular/core';

import { Join } from '../types';

export type Pos = { left: number; top: number; }

@Component({
  selector: 'join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  @Input() join: Join;

  fromPos: Pos = {left: 0, top: 0};
  toPos: Pos = {left: 0, top: 0};

  scale: number = 0;
  angle: number = 0;

  constructor() { }

  ngOnInit() {
    this.updatePos();

    if (this.join && this.join.from.component) {
      this.join.from.component.joined = true;
    }
  }

  updatePos() {
    if (this.join && this.join.from.component && this.join.to.component) {
      let brect = document.body.getBoundingClientRect();
      let erect1 = this.join.from.component.native.getBoundingClientRect();
      this.fromPos.left  = erect1.left - brect.left + 192;
      this.fromPos.top =  erect1.top - brect.top + 20;

      let erect2 = this.join.to.component.native.getBoundingClientRect();
      let toPos0 = <Pos> {
        left: erect2.left - brect.left,
        top: erect2.top - brect.top,
      };

      let dmin = 1000000;
      [{ left: toPos0.left, top: toPos0.top + 136 },
        { left: toPos0.left + 108, top: toPos0.top },
        { left: toPos0.left + 232, top: toPos0.top + 136 },
        { left: toPos0.left + 108, top: toPos0.top + 288 }]
        .forEach(pos => {
          let d = this.D(pos, this.fromPos);
          if (d < dmin) {
            this.toPos = pos;
            dmin = d;
          }
        });


      let dl = this.fromPos.left - this.toPos.left;
      let dt = this.fromPos.top - this.toPos.top;
      this.scale = Math.sqrt((dl * dl) + (dt * dt)) / 100;
      this.angle =  Math.atan2(-dt, -dl) / Math.PI * 180;
    }
  }

  private D(a: Pos, b: Pos) {
    let dl = a.left - b.left;
    let dt = a.top - b.top;
    return Math.sqrt((dl * dl) + (dt * dt));
  }

  @HostListener('window:mousemove', ['$event'])
  update(event) {
    if (event.which == 1) {
      this.updatePos();
    }
  }
}
