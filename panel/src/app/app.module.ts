import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon'

import { AppComponent } from './app.component';
import { ModelComponent } from './model/model.component';

import { CentralService } from './central.service';
import { FieldComponent } from './field/field.component';
import { JoinComponent } from './join/join.component';
import { OverlayComponent } from './overlay/overlay.component';


@NgModule({
  declarations: [
    AppComponent,
    ModelComponent,
    FieldComponent,
    JoinComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    MatIconModule,
  ],
  providers: [
    CentralService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
