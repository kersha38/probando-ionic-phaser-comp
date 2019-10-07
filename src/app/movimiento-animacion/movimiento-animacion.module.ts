import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MovimientoAnimacionPage } from './movimiento-animacion.page';

const routes: Routes = [
  {
    path: '',
    component: MovimientoAnimacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MovimientoAnimacionPage]
})
export class MovimientoAnimacionPageModule {}
