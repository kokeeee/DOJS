import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuegosI } from 'src/app/models/models';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { InteractionService } from 'src/app/servicios/interaction.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  juegos: JuegosI={
    id: '', 
    nombre: '',
    precio: 0,
    descripcion: '',
    plataforma: '',
  }
  

  constructor(
              private auth: AuthService,
              private firestore: FirestoreService,
              private router: Router,
              private interaction: InteractionService
  ) { }

  ngOnInit() {
  }

  agregarJuego() {
    if (this.camposIncompletos()) {
      this.interaction.presentToast('Por favor, complete todos los campos.');
      return; // No agrega el juego si faltan datos.
    }
  
    this.interaction.presentLoading('Agregando Juego...');
  
    // Genera un ID único para el juego
    const id = this.firestore.getId();
    
    // Agrega el campo 'id' al objeto 'juegos'
    this.juegos.id = id;
  
    // Agrega el juego usando el servicio
    this.firestore.createDoc(this.juegos, 'juegos', id)
      .then(() => {
        this.interaction.closeLoading();
        this.router.navigate(['/listar-juegos']);
      })
      .catch(error => {
        console.error('Error al agregar juego:', error);
        this.interaction.closeLoading();
      });
  }

  camposIncompletos() {
    const { nombre, precio, descripcion, plataforma } = this.juegos;
    return !nombre || precio <= 0 || !descripcion || !plataforma;
  }

}
