import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./templates/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./templates/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./templates/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./templates/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('./templates/productos/agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'listar-juegos',
    loadChildren: () => import('./templates/productos/listar-juegos/listar-juegos.module').then( m => m.ListarJuegosPageModule)
  },
  {
    path: 'editarj/:id',
    loadChildren: () => import('./templates/productos/editar-j/editar-j.module').then( m => m.EditarJPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
