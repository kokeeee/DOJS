import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { JuegosI } from 'src/app/models/models';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { InteractionService } from 'src/app/servicios/interaction.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  juegos: JuegosI[]= [];

  constructor(
              private bd: FirestoreService,
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

}
