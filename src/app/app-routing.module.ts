import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'combinado', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'grillas-menu', loadChildren: './grillas-menu/grillas-menu.module#GrillasMenuPageModule' },
  { path: 'movimiento-animacion', loadChildren: './movimiento-animacion/movimiento-animacion.module#MovimientoAnimacionPageModule' },
  { path: 'combinado', loadChildren: './combinado/combinado.module#CombinadoPageModule' },
  { path: 'mostrando', loadChildren: './mostrando/mostrando.module#MostrandoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
