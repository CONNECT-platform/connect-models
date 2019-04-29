import { Component, ViewChild, HostListener } from '@angular/core';

import { ModelSchema, Model, Join, Field } from './types';
import { CentralService } from './central.service';

import { OverlayComponent } from './overlay/overlay.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  selectModel: Model;
  _models: { [name: string]: Model} = {};
  freeModel: Model = undefined;
  joins: Join[] = [];
  freeJoin: Join = undefined;

  @ViewChild('addOverlay') addOverlay: OverlayComponent;
  @ViewChild('aliasOverlay') aliasOverlay: OverlayComponent;

  constructor(public central: CentralService) {}

  get models(): Model[] { return Object.values(this._models); }

  addModel(schema: ModelSchema) {
    let newModel = new Model(schema);
    if (!this.selectModel) this.selectModel = newModel;

    if (schema.name in this._models) {
      this.freeModel = newModel;
      this.aliasOverlay.activate();
    }
    else
      this._models[schema.name] = newModel;
    this.addOverlay.close();
  }

  addFreeModel(alias: string) {
    if (this.freeModel && !(alias in this._models)) {
      this._models[alias] = this.freeModel;
      this.freeModel.alias = alias;
      this.freeModel = undefined;
      this.aliasOverlay.close();
    }
  }

  addJoin(field: Field) {
    if (!this.freeJoin) {
      this.freeJoin = <Join> {
        from: field,
        to: undefined,
      };

      this.joins.push(this.freeJoin);
    }
  }

  closeJoin(model: Model) {
    if (this.freeJoin && model != this.freeJoin.from.model && this.freeJoin.from.schema.reference == model.schema) {
      this.freeJoin.to = model;
      this.freeJoin = undefined;
    }
  }

  @HostListener('document:keydown.escape')
  discardJoin() {
    if (this.freeJoin) {
      this.joins = this.joins.filter(join => join != this.freeJoin);
      if (this.freeJoin.from.component) {
        this.freeJoin.from.component.joined = false;
      }
      this.freeJoin = undefined;
    }
  }
}
