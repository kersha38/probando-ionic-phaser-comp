import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'prueba-pista', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'regla-tres', loadChildren: './regla-tres/regla-tres.module#ReglaTresPageModule' },
  { path: 'autopista', loadChildren: './autopista/autopista.module#AutopistaPageModule' },
  { path: 'prueba-pista', loadChildren: './prueba-pista/prueba-pista.module#PruebaPistaPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
