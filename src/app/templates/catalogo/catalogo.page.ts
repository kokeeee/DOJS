import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { JuegosI } from 'src/app/models/models';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { InteractionService } from 'src/app/servicios/interaction.service';
import { DetallejuegomodalComponent } from '../components/detallejuegomodal/detallejuegomodal.component';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  juegos: JuegosI[]= [];
  itemsCarrito: JuegosI[] = [];
  total: number = 0;

  constructor(
              private bd: FirestoreService,
              private interaction: InteractionService,
              private carrito: CarritoService,
              private modal: ModalController
              ) { }

  ngOnInit() {
    this.getJuegos();
  }

  getJuegos() {
    this.bd.getCollection<JuegosI>('juegos').subscribe(juegos => {
      this.juegos = juegos;
    });
  }

  async mostrarDetallesJuego(juego: JuegosI) {
    const modal = await this.modal.create({
      component: DetallejuegomodalComponent,
      componentProps: { juegoInfo: juego } // Pasa la información del juego al modal
    });
    return await modal.present();
  }

  agregarAlCarrito(juego: JuegosI) {
    if (juego.stock > 0) {
      this.carrito.agregarAlCarrito(juego);
      this.interaction.presentToast("Producto añadido al carrito...");
    } else {
      this.interaction.presentToast("Producto agotado");
    }
  }

  
}


