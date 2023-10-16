import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from 'src/app/models/models';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { InteractionService } from 'src/app/servicios/interaction.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  datos: UserI = {
    username: '',
    correo:'',
    telefono:'',
    uid: this.firestore.getId(),
    password: '',
    perfil: 'Usuario'
  }

  constructor(private auth: AuthService,
              private firestore: FirestoreService,
              private router: Router,
              private interaction: InteractionService) { }

  ngOnInit() {
  }

  async register() {
    this.interaction.presentLoading('Registrando Usuario...');
    
    try {
      // Registra al usuario en Firebase Authentication
      const authResult = await this.auth.registerUsers(this.datos);
  
      // Comprueba si el usuario se registró con éxito
      if (authResult && authResult.user) {
        console.log('Usuario registrado con éxito en Firebase Authentication:', authResult);
        
        // Almacena los datos del usuario en Firestore Database
        const path = 'Usuarios';
        this.datos.uid = authResult.user.uid; // Utiliza el ID de autenticación de Firebase
        this.datos.password = ''; // No es necesario almacenar la contraseña
        await this.firestore.createDoc(this.datos, path, this.datos.uid);
    
        this.interaction.closeLoading();
        this.interaction.presentToast('Usuario creado con éxito');
        this.router.navigate(['/login']);
      } else {
        this.interaction.closeLoading();
        this.interaction.presentToast('Error al crear el usuario...');
      }
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      this.interaction.closeLoading();
      this.interaction.presentToast('Error al crear el usuario...');
    }
  }
  

}
