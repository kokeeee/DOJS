import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardsService } from './servicios/guards.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'perfil',
    redirectTo: 'perfil',
    pathMatch: 'full'
  },
  {
    path: 'agregar',
    redirectTo: 'agregar',
    pathMatch: 'full'
  },
  {
    path: 'listar-juegos',
    redirectTo: 'listar-juegos',
    pathMatch: 'full'
  },
  ///////////////////////////////////////////////////////////////////////////////////
  // Seccion que se encarga de redireccionar a las vistas
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
    loadChildren: () => import('./templates/home/home.module').then( m => m.HomePageModule),
    canActivate: [GuardsService]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./templates/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [GuardsService]
  },
  {
    path: 'agregar',
    loadChildren: () => import('./templates/productos/agregar/agregar.module').then( m => m.AgregarPageModule),
    canActivate: [GuardsService]
  },
  {
    path: 'listar-juegos',
    loadChildren: () => import('./templates/productos/listar-juegos/listar-juegos.module').then( m => m.ListarJuegosPageModule),
    canActivate: [GuardsService]
  },
  {
    path: 'editarj/:id',
    loadChildren: () => import('./templates/productos/editar-j/editar-j.module').then( m => m.EditarJPageModule),
    canActivate: [GuardsService]
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./templates/catalogo/catalogo.module').then( m => m.CatalogoPageModule),
    canActivate: [GuardsService]
  },
  {
    path: 'e404',
    loadChildren: () => import('./templates/e404/e404.module').then( m => m.E404PageModule)
  },
  // si la pagina no existe manda a la pagina de error 404 
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
