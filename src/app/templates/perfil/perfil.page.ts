import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/models';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  uid: string | null = null;
  info: UserI | null = null;

  constructor(private auth: AuthService,
              private firestore: FirestoreService,) { }

  async ngOnInit() {
    console.log('Estoy en mi perfil');
    this.auth.stateUser().subscribe(res =>{
      console.log('en perfil - estado autentificacion:',res);
      this.getUid();
    });
    this.getUid();



  }

  async getUid(){
   const uid = await this.auth.getUid();
   if (uid){
    this.uid= uid;
    console.log('uid:',this.uid);
    this.getInfoUser();
   }else{
    console.log('no existe el uid')
   }
  }

  getInfoUser() {
    const path = 'Usuarios';
    if (this.uid) {
      const id = this.uid; 
      this.firestore.getDoc<UserI>(path, id).subscribe(res => {
        if (res) {
          this.info = res;
        }
        console.log('datos son -> ', res);
      });
    } else {
      console.log('No existe el UID');
    }
  }


  // Nuevo método para manejar la carga de la imagen de perfil
  async uploadImageProfile(event: any) {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async (image) => {
        if (image && image.target && image.target.result) {
          this.info = this.info || {} as UserI;  // Asegúramos de que this.info no sea null
          this.info.imagenPerfil = image.target.result as string;
          await this.updateImageProfile();  // Actualiza la imagen de perfil en Firestore
        }
      };
      reader.readAsDataURL(file);
    }
  }

    // Nuevo método para actualizar la imagen de perfil en Firestore
    private async updateImageProfile() {
      if (this.uid && this.info) {
        const id = this.uid;
        const dataToUpdate = { imagenPerfil: this.info.imagenPerfil };
        await this.firestore.updateDoc('Usuarios', id, dataToUpdate);
      }
    }

}
