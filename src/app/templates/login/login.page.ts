import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { InteractionService } from 'src/app/servicios/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credenciales= {
    correo: '',
    password: ''
  }

  constructor(private router: Router,
              private auth: AuthService,
              private interaction: InteractionService) { }

  ngOnInit() {
  }

  async logeando(){
    await this.interaction.presentLoading('Ingresando...')
    console.log('credenciales -> ', this.credenciales);
    const res = await this.auth.login(this.credenciales.correo, this.credenciales.password).catch(error =>{
      console.log('error');
      this.interaction.closeLoading();
      this.interaction.presentToast('Usuario o contraseña incorrecto...')
    })
    if (res){
      console.log('respuesta:',res);
      this.interaction.closeLoading();
      this.interaction.presentToast('Usuario correcto...')
      this.router.navigate(['/home']);
    }

  }

}
