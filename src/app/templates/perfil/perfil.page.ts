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

}
