import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detallejuegomodal',
  templateUrl: './detallejuegomodal.component.html',
  styleUrls: ['./detallejuegomodal.component.scss'],
})
export class DetallejuegomodalComponent  implements OnInit {
  @Input() juegoInfo: any; // Recibe la información del juego desde el componente padre

  constructor(private modal: ModalController) { }

  ngOnInit() {}

  cerrarModal() {
    this.modal.dismiss();
  }

}
