import { Component } from '@angular/core';

import { Model, Join } from './types';
import { CentralService } from './central.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  models: Model[] = [];
  joins: Join[] = [];

  constructor(public central: CentralService) {
    this.models = [
      new Model(central.schemas.user),
      new Model(central.schemas.journal)
    ];

    this.joins.push({
      from: this.models[1].fields.editor,
      to: this.models[0]
    });
  }
}
