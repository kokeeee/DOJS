import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MperfilPageRoutingModule } from './mperfil-routing.module';

import { MperfilPage } from './mperfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MperfilPageRoutingModule
  ],
  declarations: [MperfilPage]
})
export class MperfilPageModule {}
