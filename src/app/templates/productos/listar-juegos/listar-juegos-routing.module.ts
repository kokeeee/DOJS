import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarJuegosPage } from './listar-juegos.page';

const routes: Routes = [
  {
    path: '',
    component: ListarJuegosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarJuegosPageRoutingModule {}
