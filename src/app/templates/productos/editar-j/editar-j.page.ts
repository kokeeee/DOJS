import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JuegosI } from 'src/app/models/models';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { InteractionService } from 'src/app/servicios/interaction.service';

@Component({
  selector: 'app-editar-j',
  templateUrl: './editar-j.page.html',
  styleUrls: ['./editar-j.page.scss'],
})
export class EditarJPage implements OnInit {
  juegos: JuegosI = {
    id: '',
    nombre: '',
    precio: 0,
    descripcion: '',
    plataforma: '',
  };

  constructor(private bd: FirestoreService,
              private interaction: InteractionService,
              private router: Router,
              private route: ActivatedRoute,
              ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.cargarJuego(id);
      }
    });
  }

  cargarJuego(id: string) {
    this.bd.getDoc<JuegosI>('juegos', id).subscribe((juego) => {
      if (juego) {
        this.juegos = juego;
      } else {
        this.juegos = { id: '', nombre: '', precio: 0, descripcion: '', plataforma: '' }; 
      }
    });
  }

  actualizarJuego(id: string) {
    this.interaction.presentLoading('Actualizando Juego');
  
    // Actualiza el juego usando el servicio
    this.bd.updateDoc('juegos', id, this.juegos).then(() => {
      this.interaction.closeLoading();
      this.interaction.presentToast('Juego modificado correctamente...')
      this.router.navigate(['/listar-juegos']);
    })
    .catch((error) => {
      console.error('Error al actualizar juego:', error);
      this.interaction.closeLoading();
    });
  }
}
