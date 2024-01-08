import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PizzasPage } from './pizzas.page';

const routes: Routes = [
  {
    path: '',
    component: PizzasPage
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzasPageRoutingModule {}
