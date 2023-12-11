import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuegosI } from 'src/app/models/models';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { InteractionService } from 'src/app/servicios/interaction.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})

export class AgregarPage implements OnInit {

  juegos: JuegosI = {
    id: '',
    nombre: '',
    precio: 0,
    descripcion: '',
    plataforma: '',
    imagen: '',
    stock: 0,
  };

  newFile: any; //variable que almacena la nueva imagen del juego

  constructor(
    private firestore: FirestoreService,
    private router: Router,
    private interaction: InteractionService
  ) {}

  ngOnInit() {}

  agregarJuego() {
    if (this.camposIncompletos()) {
      this.interaction.presentToast('Por favor, complete todos los campos.');
      return;
    }

    this.interaction.presentLoading('Agregando Juego...');

    const id = this.firestore.getId();
    this.juegos.id = id;

    // Sube la imagen a Firebase Storage y obtén la URL
    if (this.newFile) {
      this.uploadImageAndSaveGame();
    } else {
      this.saveGame(); // Guarda el juego si no hay nueva imagen.
    }
  }

  camposIncompletos() {
    const { nombre, precio, descripcion, plataforma } = this.juegos;
    return !nombre || precio <= 0 || !descripcion || !plataforma || !this.juegos.imagen;
  }

  // Método para manejar la carga de una nueva imagen.
  newImageUpload(event: any) {
    if (event.target && event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0]; // Obtiene el archivo de la carga.
      const reader = new FileReader();
      reader.onload = (image) => {
        if (image && image.target && image.target.result) {
          this.juegos.imagen = image.target.result as string; // Asigna la imagen convertida a base64 a la variable del juego.
        }
      };
      reader.readAsDataURL(event.target.files[0]); // Lee el archivo como base64.
    }
  }

  // Método para subir la nueva imagen y guardar el juego.
  private uploadImageAndSaveGame() {
    const id = this.firestore.getId();
    this.juegos.id = id;

    const imagenId = this.firestore.getId();
    const imagenRef = `juegos/${this.juegos.id}/imagenes/${imagenId}`;

    // Sube el archivo al storage y obtén la URL
    this.firestore.uploadImage(this.newFile, imagenRef, this.newFile.name).then((url: string) => {
      this.juegos.imagen = url; // Asigna la URL de la imagen al juego.
      this.saveGame(); // Guarda el juego.
      this.interaction.presentToast('Juego agregado exitosamente...')
    });
  }


   // Método para guardar el juego en Firestore.
  private saveGame() {
    this.firestore.createDoc(this.juegos, 'juegos', this.juegos.id)
      .then(() => {
        this.interaction.closeLoading();
        this.router.navigate(['/listar-juegos']);
      })
      .catch(error => {
        console.error('Error al agregar juego:', error); // Maneja errores.
        this.interaction.closeLoading();
      });
  }
}
