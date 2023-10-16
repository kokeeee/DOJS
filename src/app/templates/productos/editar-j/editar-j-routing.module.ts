import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarJPage } from './editar-j.page';

const routes: Routes = [
  {
    path: '',
    component: EditarJPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarJPageRoutingModule {}
