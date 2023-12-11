import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MperfilPage } from './mperfil.page';

const routes: Routes = [
  {
    path: '',
    component: MperfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MperfilPageRoutingModule {}
