import { Component } from '@angular/core';
import { AuthService } from './servicios/auth.service';
import { InteractionService } from './servicios/interaction.service';
import { Router } from '@angular/router';
import { FirestoreService } from './servicios/firestore.service';
import { UserI } from './models/models';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  login: boolean = false;
  rol: 'Usuario' | 'Admin' | null = null;

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Catalogo', url: 'juego-add', icon: 'cart' },

  ];
  
  constructor(private auth: AuthService,
              private interac: InteractionService,
              private router: Router,
              private firestore: FirestoreService) {

                this.auth.stateUser().subscribe( res => {
                  if (res) {
                       console.log('Tiene sesion iniciada');
                       this.login = true;
                       this.getDatosUser(res.uid)
                  } else {
                    console.log('No tiene sesion iniciada');
                    this.login = false;
                  
                    
                  }   
             })
              }

  cerrar(){
    this.auth.logut();
    this.interac.presentToast('Sesion cerrada...');
    this.router.navigate(['/login']);
  }

  getDatosUser(uid: string) {
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<UserI>(path, id).subscribe( res => {
        console.log('datos -> ', res);
        if (res) {
          this.rol = res.perfil
        }
    })
  }
}
