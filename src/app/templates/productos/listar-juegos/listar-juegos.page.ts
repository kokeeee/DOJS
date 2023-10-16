import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { JuegosI } from 'src/app/models/models';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { InteractionService } from 'src/app/servicios/interaction.service';

@Component({
  selector: 'app-listar-juegos',
  templateUrl: './listar-juegos.page.html',
  styleUrls: ['./listar-juegos.page.scss'],
})
export class ListarJuegosPage implements OnInit {

  juegos: JuegosI[]= [];

  constructor(private bd: FirestoreService,
              private interaction: InteractionService,
              private router: Router,
              private alertController: AlertController
    
              ) { }

  ngOnInit() {
    this.getJuegos();
  }

  getJuegos() {
    this.bd.getCollection<JuegosI>('juegos').subscribe(juegos => {
      this.juegos = juegos;
    });
  }

  eliminarJuego(id: string) {
    this.bd.deleteDoc('juegos', id)
      .then(() => {
        this.getJuegos();
      })
      .catch(error => {
        console.error('Error al eliminar juego:', error);
      });
  }

  async confirmarEliminacion(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmacion',
      message: '¿Estás seguro de que deseas eliminar este juego?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarJuego(id);
          }
        }
      ]
    });
  
    await alert.present();
  }

}
