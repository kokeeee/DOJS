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
    imagen: '',
    stock: 0
  };

  constructor(private bd: FirestoreService,
              private interaction: InteractionService,
              private router: Router,
              private route: ActivatedRoute,
              ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {// Observa los cambios en los parámetros de la ruta.
      const id = params['id'];// Obtiene el parámetro 'id' de la ruta.
      if (id) {
        this.cargarJuego(id);// Carga la información del juego utilizando el ID.
      }
    });
  }


  // Método para cargar la información de un juego en base a su ID.
  cargarJuego(id: string) {
    this.bd.getDoc<JuegosI>('juegos', id).subscribe((juego) => {
      if (juego) {
        this.juegos = juego; // Asigna la información del juego a la variable 'juegos'.
      } else {
        this.juegos = { id: '', nombre: '', precio: 0, descripcion: '', plataforma: '' ,imagen: '',stock:0}; 
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

  newImageUpload(event: any) {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0]; // Obtiene el archivo de la carga.
      const reader = new FileReader();
      reader.onload = (image) => {
        if (image && image.target && image.target.result) {
          this.juegos.imagen = image.target.result as string; // Asigna la imagen convertida a base64 a la variable del juego.
        }
      };
      reader.readAsDataURL(file); // Lee el archivo como base64.
    }
  }
}
