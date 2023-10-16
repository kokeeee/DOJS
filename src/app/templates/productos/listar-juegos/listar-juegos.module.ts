import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarJuegosPageRoutingModule } from './listar-juegos-routing.module';

import { ListarJuegosPage } from './listar-juegos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarJuegosPageRoutingModule
  ],
  declarations: [ListarJuegosPage]
})
export class ListarJuegosPageModule {}
