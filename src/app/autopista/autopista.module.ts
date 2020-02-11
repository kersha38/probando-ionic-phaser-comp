import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AutopistaPage } from './autopista.page';

const routes: Routes = [
  {
    path: '',
    component: AutopistaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AutopistaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AutopistaPageModule {}
