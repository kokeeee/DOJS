import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarJPageRoutingModule } from './editar-j-routing.module';

import { EditarJPage } from './editar-j.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarJPageRoutingModule
  ],
  declarations: [EditarJPage]
})
export class EditarJPageModule {}
