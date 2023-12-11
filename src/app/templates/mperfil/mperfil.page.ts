import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { InteractionService } from 'src/app/servicios/interaction.service';

@Component({
  selector: 'app-mperfil',
  templateUrl: './mperfil.page.html',
  styleUrls: ['./mperfil.page.scss'],
})
export class MperfilPage implements OnInit {

  info: UserI = {
    username: '',
    correo: '',
    telefono: '',
    uid: '',  
    password: '',  
    perfil: 'Usuario',
    imagenPerfil: '',
  };

  constructor(private route: ActivatedRoute,
               private firestore: FirestoreService,
               private router: Router,
               private interaction: InteractionService) { }

  ngOnInit() {
    // Cargar la información del usuario al inicializar la página
    this.route.params.subscribe(params => {
      const userId = params['id']; // Obteniendo el parámetro 'id' de la URL
      this.getInfoUser(userId);
    });
  }

  // traemos la informacion del path de usuarios de firebase
  getInfoUser(uid: string) {
    const path = 'Usuarios';
    this.firestore.getDoc<UserI>(path, uid).subscribe(res => {
      if (res) {
        this.info = res;
      }
    });
  }

  //  método para manejar la carga de la imagen de perfil
  async uploadImage(event: any) {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (image) => {
        if (image && image.target && image.target.result) {
          this.info.imagenPerfil = image.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Método para actualizar el perfil
  async actualizarPerfil() {
    const id = this.info.uid || ''; // nos asegúramos de tener el uid
    await this.firestore.updateDoc('Usuarios', id, this.info);
    this.interaction.presentToast("Perfil actualizado...")
    this.router.navigate(['/perfil']);
  }
}
