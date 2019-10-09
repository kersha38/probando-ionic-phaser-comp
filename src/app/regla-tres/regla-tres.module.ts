import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReglaTresPage } from './regla-tres.page';

const routes: Routes = [
  {
    path: '',
    component: ReglaTresPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReglaTresPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReglaTresPageModule {}
